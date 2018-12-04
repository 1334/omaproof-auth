const { getGrandParentsBySessionData } = require('../db/models/grandParent');
const {
  monthOfBirthSelection,
  selectMonthsOfChildrenSelection,
  selectContactNumber,
  selectPictures,
  selectGrandParentName,
  selectNamesOfChildrenSelection
} = require('./questions');

/**
 * Logic behind taking posing the right question at the right time
 */

const questionProtocol = async sessionData => {
  const {
    selectedMonths,
    monthOfBirth,
    progress,
    isNames,
    isGrandParentNameSelection,
    isPictures
  } = sessionData;
  let steps = progress.length;
  // Start with selecting a month of birth
  if (!monthOfBirth) return monthOfBirthSelection;
  // Select the months of birth of the children
  if (!selectedMonths.length) return selectMonthsOfChildrenSelection;
  // From here onwards we consult the database

  // Check the remaining grandparent given the data
  const IDs = await getGrandParentsBySessionData(sessionData, ['userId']);
  sessionData.progress.push(IDs);

  if (isNames) {
    if (IDs.length <= 8 || steps === 6) {
      sessionData.isNames = false;
    }
    return selectNamesOfChildrenSelection;
  }
  // family can have 8 grandparents, who have the same grandkids and can be born in the same month (theoretically)
  // from that moment have them check the pictures
  if (IDs.length > 8) return selectContactNumber;

  if (isPictures) {
    sessionData.isPictures = false;
    return selectPictures(sessionData, IDs);
  }
  // if the select the pictures has been successfull (boolean) all that remains is to select the right grandparent
  if (IDs.length > 1 && isGrandParentNameSelection) {
    sessionData.isGrandParentNameSelection = false;
    return selectGrandParentName(sessionData, IDs);
  }
  if (IDs.length < 1)
    return {
      options: [],
      type: 'failure'
    };

  return {
    options: [],
    type: 'success'
  };
};

module.exports = {
  questionProtocol
};
