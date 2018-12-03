const db = require('../src/db/schemas');
const grandChildSeeder = require('../testSeeders/grandChildren');
const grandParentSeeder = require('../testSeeders/grandParents');
const relationSeeder = require('../testSeeders/relations');
const {
  getGrandParentsBySessionData
} = require('../src/db/models/grandParent');

describe('testing the database models: grandParent', () => {
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

  const Mock_session = {
    selectedNames: [],
    unselectedNames: [],
    selectedMonths: [],
    monthOfBirth: null,
    contactNumber: null,
    grandParentName: null,
    selectedPictures: [],
    unselectedPictures: []
  };

  const Mock_selectedNames = { ...Mock_session, selectedNames: ['Subject1'] };
  const Mock_unselectedNames = {
    ...Mock_session,
    unselectedNames: ['Subject1']
  };
  const Mock_selectedMonths = { ...Mock_session, selectedMonths: [2] };
  const Mock_monthOfBirth = { ...Mock_session, monthOfBirth: 2 };
  const Mock_contactNumber = { ...Mock_session, contactNumber: 'Subject7' };
  const Mock_grandParentName = { ...Mock_session, grandParentName: 'Subject6' };
  const Mock_selectedPictures = {
    ...Mock_session,
    selectedPictures: ['Subject1']
  };
  const Mock_unselectedPictures = {
    ...Mock_session,
    unselectedPictures: ['Subject1']
  };

  it('should throw an error if no sessionData provided', async () => {
    expect(() => {
      getGrandParentsBySessionData({});
    }).toThrow();
  });

  it('should return all grandParents if no names or months have been selected', async () => {
    const result = await getGrandParentsBySessionData(Mock_session);
    expect(result.length).toEqual(4);
  });

  it('should return the right grandParents if selectedMonths passed', async () => {
    const result = await getGrandParentsBySessionData(Mock_selectedMonths);
    expect(result.length).toEqual(2);
  });

  it('should return the right grandParents if selectedNames passed', async () => {
    const result = await getGrandParentsBySessionData(Mock_selectedNames);
    expect(result.length).toEqual(2);
  });

  it('should return the right grandParents if unselectedNames passed', async () => {
    const result = await getGrandParentsBySessionData(Mock_unselectedNames);
    expect(result.length).toEqual(3);
  });

  it('should return the right grandParent if contactNumber is passed', async () => {
    const result = await getGrandParentsBySessionData(Mock_contactNumber);
    expect(result.length).toEqual(1);
  });

  it('should return the right grandParent if grandParentName passed', async () => {
    const result = await getGrandParentsBySessionData(Mock_grandParentName);
    expect(result.length).toEqual(1);
  });

  it('should return the right grandParents if monthOfBirth is passed', async () => {
    const result = await getGrandParentsBySessionData(Mock_monthOfBirth);
    expect(result.length).toEqual(2);
  });

  it('should return the right grandParents if selectedPictures passed', async () => {
    const result = await getGrandParentsBySessionData(Mock_selectedPictures);
    expect(result.length).toEqual(2);
  });

  it('should return the right grandParents if unselectedPictures passed', async () => {
    const result = await getGrandParentsBySessionData(Mock_unselectedPictures);
    expect(result.length).toEqual(2);
  });
});
