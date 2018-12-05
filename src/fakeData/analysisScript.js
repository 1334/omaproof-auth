const { getGrandParentByDatabaseId } = require('../db/models/grandParent');
const { authenticationProcess } = require('../logic/generalProcess');
/**
 * Script to run all the names in the development database in order to test the performance of the algo
 *
 */

const runAlgo = async id => {
  let counter = 0;
  const client = await getGrandParentByDatabaseId(id);
  let query = await authenticationProcess();
  let { sessionToken, question } = query;
  while (
    question.type !== 'success' &&
    question.type !== 'failure' &&
    counter < 10
  ) {
    let answer = await answerMachine(question, client);
    query = await authenticationProcess(sessionToken, answer);
    sessionToken = query.sessionToken;
    question = query.question;
    counter++;
  }

  console.log('Id: ', id, ' name: ', client.firstname, 'type: ', question.type); // eslint-disable-line
};

const answerMachine = async (question, client) => {
  let standard, childMonths, names, pictures;
  switch (question.type) {
    case 'GrandParent_MonthOfBirth':
      return {
        type: 'GrandParent_MonthOfBirth',
        selected: [client.monthOfBirth],
        unselected: []
      };
    case 'GrandChildren_MonthsOfBirth':
      standard = [
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
      ];

      childMonths = [...new Set(client.children.map(el => el.monthOfBirth))];
      return {
        type: 'GrandChildren_MonthsOfBirth',
        selected: childMonths,
        unselected: standard.filter(el => !childMonths.includes(el))
      };
    case 'GrandChildren_Names':
      names = [...new Set(client.children.map(el => el.firstname))];
      return {
        type: 'GrandChildren_Names',
        selected: question.options.filter(el => names.includes(el)),
        unselected: question.options.filter(el => !names.includes(el))
      };
    case 'GrandParent_ContactNumber':
      return {
        type: 'GrandParent_ContactNumber',
        selected: [client.contactNumber],
        unselected: []
      };
    case 'GrandChildren_Authorization_Pictures':
      pictures = [...new Set(client.children.map(el => el.picture))];
      return {
        type: 'GrandChildren_Authorization_Pictures',
        selected: question.options.filter(el => pictures.includes(el)),
        unselected: question.options.filter(el => !pictures.includes(el))
      };
    case 'Select_right_familymember':
      return {
        type: 'Select_right_familymember',
        selected: question.options.filter(el => el === client.firstname),
        unselected: question.options.filter(el => el !== client.firstname)
      };
  }
};

const testMotha = () => {
  let id;
  setInterval(() => {
    id = Math.round(Math.random() * 500);
    runAlgo(id);
  }, 2000);
};

testMotha();
