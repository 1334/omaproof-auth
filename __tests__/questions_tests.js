const {
  selectPictures,
  selectGrandParentName,
  selectNamesOfChildrenSelection
} = require('../src/logic/questions');

describe('testing the questions: selectPictures', () => {
  const mock1 = ['grandMother1', 'grandMother2'];
  const mock2 = ['grandMother3'];
  const mock3 = ['grandMother4', 'grandMother5'];

  it('should return three pictures', async () => {
    const result = await selectPictures(mock1, 3);
    expect(result.options.length).toEqual(3);
  });

  it('One picture should be related to the IDs', async () => {
    const result = await selectPictures(mock1, 3);
    expect(result.options).toContain('kid1');
  });

  it('Should return 3 pictures', async () => {
    const result = await selectPictures(mock2, 3);
    expect(result.options.length).toEqual(3);
  });

  it('Two pictures should be related to the IDs', async () => {
    const result = await selectPictures(mock3, 3);
    expect(result.options).toContain('kid1');
    expect(result.options).toContain('kid2');
  });
});

describe('testing the questions: selectGrandParentName', () => {
  const Mock_session1 = {
    selectedNames: ['kid1'],
    unselectedNames: [],
    selectedMonths: [],
    monthOfBirth: null,
    contactNumber: null,
    grandParentName: null,
    selectedPictures: [],
    unselectedPictures: []
  };
  it('should return two grandParent names', async () => {
    const result = await selectGrandParentName(Mock_session1);
    expect(result.options.length).toEqual(2);
  });

  it('should return the following grandParent names', async () => {
    const result = await selectGrandParentName(Mock_session1);
    expect(result.options).toContain('grandMother1');
    expect(result.options).toContain('grandMother4');
  });
});

describe('testing the questions: selectNamesOfChildrenSelection', () => {
  const IDs = [
    'grandMother1',
    'grandMother2',
    'grandMother3',
    'grandMother4',
    'grandMother5'
  ];
  const Mock_session1 = {
    selectedNames: ['kid4'],
    unselectedNames: [],
    selectedMonths: [],
    monthOfBirth: null,
    contactNumber: null,
    grandParentName: null,
    selectedPictures: [],
    unselectedPictures: []
  };

  const Mock_session2 = {
    selectedNames: [],
    unselectedNames: ['kid4'],
    selectedMonths: [],
    monthOfBirth: null,
    contactNumber: null,
    grandParentName: null,
    selectedPictures: [],
    unselectedPictures: []
  };
  it('should return three names', async () => {
    const result = await selectNamesOfChildrenSelection(IDs, Mock_session1, 3);
    expect(result.options.length).toEqual(3);
  });

  it('should contain all names except for select names', async () => {
    const result = await selectNamesOfChildrenSelection(IDs, Mock_session1, 4);
    expect(result.options).toContain('kid1');
    expect(result.options).toContain('kid3');
    expect(result.options).toContain('kid5');
    expect(result.options).toContain('kid2');
  });

  it('should contain all names except for in unselected names', async () => {
    const result = await selectNamesOfChildrenSelection(IDs, Mock_session2, 4);
    expect(result.options).toContain('kid1');
    expect(result.options).toContain('kid3');
    expect(result.options).toContain('kid5');
    expect(result.options).toContain('kid2');
  });

  it('should not contain doubles', async () => {
    const result = await selectNamesOfChildrenSelection(IDs, Mock_session2, 3);
    const test = result.options.every(el => result.options.indexOf(el) < 0);
    expect(test).toBeTruthy;
  });
});
