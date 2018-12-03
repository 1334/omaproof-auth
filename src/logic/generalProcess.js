const {
  findOrCreateSession,
  retrieveSession
} = require('../db/models/session');
const { handleAnswer } = require('./answerLogic');
const { questionProtocol } = require('./questionLogic');
const uuidv4 = require('uuid/v4');

// Startup the authentication process
const authenticationProcess = async (token, answer) => {
  let sessionData, sessionToken;
  if (!token) {
    sessionToken = uuidv4();
    sessionData = {
      selectedNames: [],
      unselectedNames: [],
      selectedMonths: [],
      selectedPictures: [],
      unselectedPictures: [],
      monthOfBirth: null,
      progress: [],
      secondaryStep: [],
      isNames: true,
      isContactNumber: false,
      isGrandParentNameSelection: false,
      contactNumber: null
    };
    await findOrCreateSession(sessionToken, sessionData);
  }
  if (!sessionData) {
    const session = await retrieveSession;
    sessionToken = session.token;
    sessionData = session.data;
  }

  // handle the answer
  sessionData = await handleAnswer(answer, sessionData);
  // generate the new question
  let question = await questionProtocol(sessionData);
  // save the current state
  await findOrCreateSession(sessionToken, sessionData);
  // need to catch a success;
  // eslint-disable-next-line no-console
  if (question.type === 'success') console.log('DO SOMETHING');
  return {
    sessionToken,
    question
  };
};

module.exports = {
  authenticationProcess
};
