const {
  findOrCreateSession,
  retrieveSession
} = require('../db/models/session');
const uuidv4 = require('uuid/v4');

const login = () => {
  console.log('Logged In');
};

const getSession = async token => {
  let sessionData, sessionToken;
  if (!token) {
    sessionToken = uuidv4();
    sessionData = {
      // data from the client
      selectedNames: [],
      unselectedNames: [],
      selectedMonths: [],
      selectedPictures: [],
      unselectedPictures: [],
      monthOfBirth: null,
      contactNumber: null,
      selectedName: null,
      // to support decision making
      progress: [],
      isNames: true,
      isPictures: true,
      isGrandParentNameSelection: true
    };
    await findOrCreateSession(sessionToken, sessionData);
  } else {
    const session = await retrieveSession(token);
    sessionToken = session.token;
    sessionData = JSON.parse(session.data);
  }
  return [sessionToken, sessionData];
};

module.exports = {
  login,
  getSession
};
