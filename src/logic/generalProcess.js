const { findOrCreateSession } = require('../db/models/session');
const { getSession } = require('./processHelpers');
const { handleAnswer } = require('./answerLogic');
const { questionProtocol } = require('./questionLogic');

// Startup the authentication process
// the endpoint that we will hit
const authenticationProcess = async (token, answer) => {
  let question;
  let { sessionToken, sessionData } = await getSession(token);
  console.log('Auth: ', token);
  console.log('answer: ', answer);
  if (answer.selected.length !== 0 && answer.unselected.length !== 0) {
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
  console.log('QuestionType: ', question);
  return {
    sessionToken,
    question
  };
};

module.exports = {
  authenticationProcess
};
