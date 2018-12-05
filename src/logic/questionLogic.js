const { getGrandParentsBySessionData } = require('../db/models/grandParent');
const questionsFuncs = require('./questions');

/**
 * Logic behind taking posing the right question at the right time
 */

const questionProtocol = async (
  sessionData,
  questions = questionsFuncs,
  getGrandParents = getGrandParentsBySessionData
) => {
  const {
    monthOfBirthSelection,
    selectMonthsOfChildrenSelection,
    selectContactNumber,
    selectPictures,
    selectGrandParentName,
    selectNamesOfChildrenSelection
  } = questions;

  let steps = sessionData.progress.length;
  // Start with selecting a month of birth
  if (!sessionData.monthOfBirth) return monthOfBirthSelection();
  // Select the months of birth of the children
  if (!sessionData.selectedMonths.length)
    return selectMonthsOfChildrenSelection();
  // From here onwards we consult the database

  // Check the remaining grandparent given the data
  let IDs = await getGrandParents(sessionData, ['userId']);
  IDs = IDs.map(el => el.userId);
  sessionData.progress.push(IDs.length);

  if (IDs.length <= 8 || steps === 6) {
    sessionData.isNames = false;
  }

  if (sessionData.isNames) {
    return selectNamesOfChildrenSelection(IDs, sessionData);
  }

  // family can have 8 grandparents, who have the same grandkids and can be born in the same month (theoretically)
  // from that moment have them check the pictures
  if (IDs.length > 8) return selectContactNumber();
  if (sessionData.isPictures) {
    sessionData.isPictures = false;
    return selectPictures(IDs);
  }
  // if the select the pictures has been successfull (boolean) all that remains is to select the right grandparent
  if (IDs.length > 1 && sessionData.isGrandParentNameSelection) {
    sessionData.isGrandParentNameSelection = false;
    return selectGrandParentName(sessionData, IDs);
  }

  if (IDs.length < 1)
    return {
      options: [],
      type: 'failure'
    };

  return {
    options: IDs,
    type: 'success'
  };
};

module.exports = {
  questionProtocol
};
