const { findOrCreateSession } = require('../db/models/session');
const { getSession } = require('./processHelpers');
const { handleAnswer } = require('./answerLogic');
const { questionProtocol } = require('./questionLogic');

/**
 * Function to start up the authentication process and retrieve / update the session data based on the token and answer
 * @param {*} token
 * @param {*} answer
 */
const authenticationProcess = async (token, answer) => {
  let question;
  let { sessionToken, sessionData } = await getSession(token);
  if (
    answer &&
    (answer.selected.length !== 0 || answer.unselected.length !== 0)
  ) {
    sessionData = await handleAnswer(answer, sessionData);
  }
  question = await questionProtocol(sessionData);
  await findOrCreateSession(sessionToken, sessionData);
  if (question.type === 'failure') {
    console.log('failure: ', sessionData.progress); // eslint-disable-line
  }
  if (question.type === 'success') {
    console.log('success: ', sessionData.progress); // eslint-disable-line
  }
  return {
    sessionToken,
    question
  };
};

module.exports = {
  authenticationProcess
};
