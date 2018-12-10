const {
  getGrandChildrenBySessionData,
  getGrandChildrenByGPId
} = require('../src/db/models/grandChild');

describe('testing the database models: grandChild by sessiondata', () => {
  const Mock_IDs = [
    'grandMother1',
    'grandMother2',
    'grandMother3',
    'grandMother4',
    'grandMother5'
  ];
  const Mock_invalid_session = {};
  const Mock_valid_empty_session = {
    selectedNames: [],
    selectedMonths: [],
    unselectedNames: []
  };
  const Mock_month_session = {
    selectedNames: [],
    selectedMonths: ['apr'],
    unselectedNames: []
  };

  const Mock_name_session = {
    selectedNames: ['kid3'],
    selectedMonths: [],
    unselectedNames: []
  };

  const Mock_unname_session = {
    selectedNames: [],
    selectedMonths: [],
    unselectedNames: ['kid3', 'kid2']
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
    expect(result.length).toEqual(5);
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
    expect(result.length).toEqual(4);
  });

  it('should return the right grandchildren if unselectedNames passed', async () => {
    const result = await getGrandChildrenBySessionData(
      Mock_IDs,
      Mock_unname_session,
      ['firstname']
    );
    expect(result.length).toEqual(3);
  });
});

describe('testing the database models: grandChild by parent ID', () => {
  it('should provide all grandchildren for grandparent id', async () => {
    const result = await getGrandChildrenByGPId(['grandMother1'], 10, [
      'firstname'
    ]);
    expect(result.length).toEqual(3);
  });

  it('should provide all grandchildren for grandparent id but no more than the amount', async () => {
    const result = await getGrandChildrenByGPId(['grandMother1'], 2, [
      'firstname'
    ]);
    expect(result.length).toEqual(2);
  });
});
