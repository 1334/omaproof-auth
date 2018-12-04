const { findOrCreateSession } = require('../db/models/session');
const { login, getSession } = require('./processHelpers');
const { handleAnswer } = require('./answerLogic');
const { questionProtocol } = require('./questionLogic');

// Startup the authentication process
// the endpoint that we will hit
const authenticationProcess = async (token, answer) => {
  let question;
  let [sessionData, sessionToken] = getSession(token);
  if (answer) {
    sessionData = await handleAnswer(answer, sessionData);
  }
  question = await questionProtocol(sessionData);
  await findOrCreateSession(sessionToken, sessionData);

  if (question.type === 'success') return login();
  if (question.type === 'failure') console.log('error');

  return {
    sessionToken,
    question
  };
};

module.exports = {
  authenticationProcess
};
