const { getGrandParentsBySessionData } = require('../db/models/grandParent');
const questionsFuncs = require('./questions');

/**
 * Business logic to pose the right question towards the client
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

  const steps = sessionData.progress.length;
  if (!sessionData.monthOfBirth) return monthOfBirthSelection();
  if (!sessionData.selectedMonths.length)
    return selectMonthsOfChildrenSelection();
  let IDs = await getGrandParents(sessionData, ['userId']);
  IDs = IDs.map(el => el.userId);
  sessionData.progress.push(IDs.length);

  if (IDs.length <= 8 || steps < 6) {
    sessionData.isNames = false;
  }

  if (sessionData.isNames) {
    return selectNamesOfChildrenSelection(IDs, sessionData);
  }

  if (IDs.length > 8) return selectContactNumber();

  if (sessionData.isPictures) {
    sessionData.isPictures = false;
    return selectPictures(IDs);
  }

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
