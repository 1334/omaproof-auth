const {
  getGrandChildrenByGPId,
  getGrandChildrenBySessionData
} = require('../db/models/grandChild');
const {
  getAllGrandParentsExceptIDs,
  getGrandParentsBySessionData
} = require('../db/models/grandParent');
const { randomNumberGenerator } = require('./helperFunctions');
const faker = require('faker');
/**
 * Generate the questions to the front-end
 */

const monthOfBirthSelection = () => {
  return {
    options: [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec'
    ],
    type: 'GrandParent_MonthOfBirth'
  };
};

const selectMonthsOfChildrenSelection = () => {
  return {
    options: [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec'
    ],
    type: 'GrandChildren_MonthsOfBirth'
  };
};

const selectContactNumber = async () => {
  return {
    options: [],
    type: 'GrandParent_ContactNumber'
  };
};

const selectPictures = async (IDs, amount = 12) => {
  let pictures = [];
  // for each ID select 1 picture
  for (let i = 0; i < IDs.length; i++) {
    let retrievedPictures = await getGrandChildrenByGPId(IDs[i], 1, [
      'picture'
    ]);
    retrievedPictures = retrievedPictures.map(el => el.picture);
    pictures = [...pictures, ...retrievedPictures];
  }
  const sublength = amount - pictures.length;
  // for the remaining pictures, select randomly from not these IDS
  let randomIDs = await getAllGrandParentsExceptIDs(IDs, ['userId']);
  for (let i = 0; i < sublength; i++) {
    const ID = randomIDs[i].userId;
    let retrievedPictures = await getGrandChildrenByGPId(ID, 1, ['picture']);
    retrievedPictures = retrievedPictures.map(el => el.picture);
    pictures = [...pictures, ...retrievedPictures];
    pictures.sort(() => 0.5 - Math.random());
  }
  return {
    options: pictures,
    type: 'GrandChildren_Authorization_Pictures'
  };
};

const selectGrandParentName = async sessionData => {
  let names = await getGrandParentsBySessionData(sessionData, ['firstname']);
  names = names.map(el => el.firstname);
  return {
    options: names,
    type: 'Select_right_familymember'
  };
};

const selectNamesOfChildrenSelection = async (
  IDs,
  sessionData,
  amount = 12
) => {
  const query = await getGrandChildrenBySessionData(IDs, sessionData, [
    'firstname'
  ]);
  let queriedNames = new Set(query.map(el => el.firstname));
  queriedNames = [...queriedNames];
  let draw = randomNumberGenerator(
    0,
    queriedNames.length - 1,
    Math.min(amount, queriedNames.length)
  );

  const drawnNames = draw.map(number => queriedNames[number]);
  const subResult = drawnNames.length;
  for (let i = subResult; i < amount; i++) {
    drawnNames.push(faker.name.firstName());
  }

  return {
    options: drawnNames,
    type: 'GrandChildren_Names'
  };
};

module.exports = {
  monthOfBirthSelection,
  selectMonthsOfChildrenSelection,
  selectContactNumber,
  selectPictures,
  selectGrandParentName,
  selectNamesOfChildrenSelection
};
