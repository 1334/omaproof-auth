const db = require('../src/db/schemas');
const grandChildSeeder = require('../testSeeders/grandChildren');
const grandParentSeeder = require('../testSeeders/grandParents');
const relationSeeder = require('../testSeeders/relations');
const {
  getGrandChildrenBySessionData
} = require('../src/db/models/grandChild');

describe('testing the database models: grandChild', () => {
  beforeAll(async () => {
    await relationSeeder.down(db.sequelize.queryInterface);
    await grandChildSeeder.down(db.sequelize.queryInterface);
    await grandParentSeeder.down(db.sequelize.queryInterface);
    await grandChildSeeder.upChildrenTest(db.sequelize.queryInterface);
    await grandParentSeeder.upChildrenTest(db.sequelize.queryInterface);
    await relationSeeder.upChildrenTest(db.sequelize.queryInterface);
  });
  afterAll(async () => {
    await relationSeeder.down(db.sequelize.queryInterface);
    await grandChildSeeder.down(db.sequelize.queryInterface);
    await grandParentSeeder.down(db.sequelize.queryInterface);
  });

  const Mock_IDs = ['6', '7', '8', '9'];
  const Mock_invalid_session = {};
  const Mock_valid_empty_session = {
    selectedNames: [],
    selectedMonths: [],
    unselectedNames: []
  };
  const Mock_month_session = {
    selectedNames: [],
    selectedMonths: [2],
    unselectedNames: []
  };

  const Mock_name_session = {
    selectedNames: ['Subject4'],
    selectedMonths: [],
    unselectedNames: []
  };

  const Mock_unname_session = {
    selectedNames: [],
    selectedMonths: [],
    unselectedNames: ['Subject4', 'Subject2']
  };

  it('should throw an error if no sessionData provided', async () => {
    expect(() => {
      getGrandChildrenBySessionData(Mock_IDs, null, null);
    }).toThrow();
  });

  it('should throw an error if an invalid sessionData provided', async () => {
    expect(() => {
      getGrandChildrenBySessionData(Mock_IDs, Mock_invalid_session, null);
    }).toThrow();
  });

  it('should return all grandChildren if no names or months have been selected', async () => {
    const result = await getGrandChildrenBySessionData(
      Mock_IDs,
      Mock_valid_empty_session,
      ['firstname']
    );
    expect(result.length).toEqual(4);
  });

  it('should return the right grandchildren if selectedMonths passed', async () => {
    const result = await getGrandChildrenBySessionData(
      Mock_IDs,
      Mock_month_session,
      ['firstname']
    );
    expect(result.length).toEqual(2);
  });

  it('should return the right grandchildren if selectedNames passed', async () => {
    const result = await getGrandChildrenBySessionData(
      Mock_IDs,
      Mock_name_session,
      ['firstname']
    );
    expect(result.length).toEqual(3);
  });

  it('should return the right grandchildren if unselectedNames passed', async () => {
    const result = await getGrandChildrenBySessionData(
      Mock_IDs,
      Mock_unname_session,
      ['firstname']
    );
    expect(result.length).toEqual(2);
  });
});
