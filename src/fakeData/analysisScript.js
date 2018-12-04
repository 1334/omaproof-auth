const { getClientData } = require('../db/models/grandParent');

/**
 * Script to run all the names in the development database in order to test the performance of the algo
 *
 */

const runAlgo = async id => {
  const client = await getClientData(id);
  // eslint-disable-next-line no-console
  console.log(client);
};

runAlgo(99);
