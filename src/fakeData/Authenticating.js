const {
  getClientData,
  getGrandChildNames,
  getGrandParentUserIDs,
  createSession,
  retrieveSession
} = require('./dbFunctions');
const { randomNumberGenerator, difference } = require('./helperFunctions');
const uuidv4 = require('uuid/v4');

const runAlgo = async id => {
  const client = await getClientData(id);
};

runAlgo(99);

// Startup the authentication process
const authenticationProcess = async (token, answer) => {
  let sessionData, sessionToken;
  if (!token) {
    sessionToken = uuidv4();
    sessionData = {
      selectedNames: [],
      unselectedNames: [],
      selectedMonths: [],
      monthOfBirth: null,
      previous_step_ID_length: [],
      secondaryStep: [],
      contactNumber: null
    };
    await createSession(sessionToken, sessionData);
  }
  if (!sessionData) {
    const session = await retrieveSession;
    console.log(session);
    sessionToken = session.token;
    sessionData = session.data;
  }
  return {
    sessionToken,
    question
  };
};

const _checkAnswer = (answer, sessionData) => {
  switch (answer.type) {
    case 'GrandParent_MonthOfBirth':
      if (
        answer.selected.length + answer.unselected.length === 12 &&
        [...answer.selected, ...answer.unselected].every(
          x => typeof x === 'number'
        )
      ) {
        sessionData.monthOfBirth = answer.selected[0];
        return sessionData;
      }
      break;
    case 'GrandChildren_MonthsOfBirth':
      if (
        answer.selected.length + answer.unselected.length === 12 &&
        [...answer.selected, ...answer.unselected].every(
          x => typeof x === 'number'
        )
      ) {
        sessionData.selectedMonths = answer.selected;
        return sessionData;
      }
      break;
    case 'GrandChildren_Names':
      if (
        answer.unselected.length + answer.selected.length === 11 &&
        [...answer.selected, ...answer.unselected].every(
          x => typeof x === 'string'
        )
      ) {
        sessionData.selectedNames = [
          ...new Set([...sessionData.selectedNames, ...answer.selected])
        ];
        sessionData.unselectedNames = [
          ...new Set([...sessionData.unselectedNames, ...answer.unselected])
        ];
        return sessionData;
      }
      break;
    case 'GrandParent_ContactNumber':
      if (
        answer.selected.length === 1 &&
        typeof answer.selected[0] === 'string'
      ) {
        sessionData.contactNumber = answer.selected[0];
      }
      break;
    case 'GrandChildren_Pictures':
      if (
        answer.selected.length + answer.unselected.length === 12 &&
        [...answer.selected, ...answer.unselected].every(
          x => typeof x === 'string'
        )
      ) {
        // do the final check based on the user Id that should now be selected and check if the answers match if so it is authenticated and authorized
      }
  }
  throw new Error('Invalid');
};

const authenticationStep = async data => {
  const {
    selectedMonths,
    monthOfBirth,
    previous_step_ID_length,
    secondaryStep
  } = data;
  let steps = previous_step_ID_length.length;

  if (secondaryStep[steps - 1]) return secondaryAuthenticationStep(data);

  if (!monthOfBirth)
    return {
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      type: 'GrandParent_MonthOfBirth'
    };

  if (!selectedMonths.length)
    return {
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      type: 'GrandChildren_MonthsOfBirth'
    };

  const IDs = await getGrandParentUserIDs(data);
  data.previous_step_ID_length.push(IDs.length);
  console.log(IDs.length);

  if (IDs.length <= 5) {
    return authorizationStep(data, IDs);
  }
  // Check if reasonable progress is being made otherwise use the secondary step

  if (
    steps > 3 &&
    previous_step_ID_length[steps - 4] - previous_step_ID_length[steps - 1] <= 0
  ) {
    data.secondaryStep.push(true);
    return secondaryAuthenticationStep(data);
  }

  // Else draw names and present them to the client
  const drawnNames = await drawNames(IDs, data, 11);
  console.log(drawnNames);
  return {
    options: drawnNames,
    type: 'GrandChildren_Names'
  };
};

const secondaryAuthenticationStep = async data => {
  return {
    options: [],
    type: 'GrandParent_ContactNumber'
  };
};

const authorizationStep = async (data, IDs) => {
  // for each ID select 2 pictures

  // for the remaining pictures, select randomly from not these IDS
  return {
    options: [],
    type: 'GrandChildren_Pictures'
  };
};

const drawNames = async (IDs, data, amount) => {
  const query = await getGrandChildNames(IDs, data);
  let queriedNames = new Set(
    query.map(el => el.get({ plain: true }).firstname)
  );
  queriedNames = [...queriedNames];
  let draw = randomNumberGenerator(0, queriedNames.length - 1, amount);
  console.log('remaining names length: ', queriedNames.length);
  const drawnNames = draw.map(number => queriedNames[number]);
  console.log('drawn: ', drawnNames);
  return drawnNames;
};
