const { findOrCreateSession } = require('../db/models/session');
const { getSession } = require('./processHelpers');
const { handleAnswer } = require('./answerLogic');
const { questionProtocol } = require('./questionLogic');

// Startup the authentication process
// the endpoint that we will hit
const authenticationProcess = async (token, answer) => {
  let question;
  let { sessionToken, sessionData } = await getSession(token);
  if (answer) {
    sessionData = await handleAnswer(answer, sessionData);
  }
  question = await questionProtocol(sessionData);
  await findOrCreateSession(sessionToken, sessionData);
  if (question.type === 'failure') console.log('error');

  return {
    sessionToken,
    question
  };
};

module.exports = {
  authenticationProcess
};
