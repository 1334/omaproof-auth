const {
  getGrandParentsBySessionData
} = require('../src/db/models/grandParent');

describe('testing the database models: grandParent', () => {
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

  const Mock_selectedNames = { ...Mock_session, selectedNames: ['kid1'] };
  const Mock_selectedMonths = { ...Mock_session, selectedMonths: ['feb'] };
  const Mock_monthOfBirth = { ...Mock_session, monthOfBirth: 'may' };
  const Mock_contactNumber = { ...Mock_session, contactNumber: 'grandMother1' };
  const Mock_grandParentName = {
    ...Mock_session,
    grandParentName: 'grandMother1'
  };
  const Mock_selectedPictures = {
    ...Mock_session,
    selectedPictures: ['kid1']
  };

  it('should return all grandParents if no names or months have been selected', async () => {
    const result = await getGrandParentsBySessionData(Mock_session);
    expect(result.length).toEqual(5);
  });

  it('should return the right grandParents if selectedMonths passed', async () => {
    const result = await getGrandParentsBySessionData(Mock_selectedMonths);
    expect(result.length).toEqual(2);
  });

  it('should return the right grandParents if selectedNames passed', async () => {
    const result = await getGrandParentsBySessionData(Mock_selectedNames);
    expect(result.length).toEqual(2);
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
});
