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
    isContactNumber,
    isGrandParentNameSelection
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
  // family can have 8 grandparents, who have the same grandkids and can be born in the same month (theoretically)
  // from that moment have them check the pictures
  if (IDs.length <= 8) return selectPictures(sessionData, IDs);

  // if the select the pictures has been successfull (boolean) all that remains is to select the right grandparent
  if (isGrandParentNameSelection)
    return selectGrandParentName(sessionData, IDs);

  // If it is deemed necessary the phone number can be requested
  if (isContactNumber) return selectContactNumber;

  // Main selection however is based on the selection of the grand child names
  // In order to not run into an infinite loop, the progress is monitored
  // Every four steps we expect better results otherwise we continue on another track

  // finally if the family remains the grandParent can select the right name and will be logged in
  if (steps > 4 && progress[steps - 5] - progress[steps - 1] <= 0) {
    sessionData.isNames = false;
  }
  // Check if we are doing names
  if (isNames) return selectNamesOfChildrenSelection;
  // Need to catch a success! HEREEEEEEEE
};

module.exports = {
  questionProtocol
};
