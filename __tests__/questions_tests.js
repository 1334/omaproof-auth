const {
  selectPictures,
  selectGrandParentName,
  selectNamesOfChildrenSelection
} = require('../src/logic/questions');

describe('testing the questions: selectPictures', () => {
  const mock1 = ['6', '9'];
  const mock2 = ['7'];
  const mock3 = ['7', '8'];

  it('should return three pictures', async () => {
    const result = await selectPictures(mock1, 3);
    expect(result.options.length).toEqual(3);
  });

  it('One picture should be related to the IDs', async () => {
    const result = await selectPictures(mock1, 3);
    expect(result.options).toContain('Subject1');
  });

  it('Should return 3 pictures', async () => {
    const result = await selectPictures(mock2, 3);
    expect(result.options.length).toEqual(3);
  });

  it('Two pictures should be related to the IDs', async () => {
    const result = await selectPictures(mock3, 3);
    expect(result.options).toContain('Subject2');
    expect(result.options).toContain('Subject3');
  });
});

describe('testing the questions: selectGrandParentName', () => {
  const Mock_session1 = {
    selectedNames: ['Subject1'],
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
    expect(result.options).toContain('Subject6');
    expect(result.options).toContain('Subject9');
  });
});

describe('testing the questions: selectNamesOfChildrenSelection', () => {
  const IDs = ['6', '7', '8', '9'];
  const Mock_session1 = {
    selectedNames: ['Subject1'],
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
    unselectedNames: ['Subject1'],
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
    const result = await selectNamesOfChildrenSelection(IDs, Mock_session1, 3);
    expect(result.options).toContain('Subject2');
    expect(result.options).toContain('Subject3');
    expect(result.options).toContain('Subject4');
  });

  it('should contain all names except for in unselected names', async () => {
    const result = await selectNamesOfChildrenSelection(IDs, Mock_session2, 3);
    expect(result.options).toContain('Subject2');
    expect(result.options).toContain('Subject3');
    expect(result.options).toContain('Subject4');
  });

  it('should not contain doubles', async () => {
    const result = await selectNamesOfChildrenSelection(IDs, Mock_session2, 3);
    const test = result.options.every(el => result.options.indexOf(el) < 0);
    expect(test).toBeTruthy;
  });
});
