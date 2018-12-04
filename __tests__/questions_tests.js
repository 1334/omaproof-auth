const { selectPictures } = require('../src/logic/questions');

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

xdescribe('testing the questions: selectGrandParentName', () => {
  it('should return all grandParents if no names or months have been selected', async () => {});

  it('should return the right grandParents if selectedMonths passed', async () => {});

  it('should return the right grandParents if selectedNames passed', async () => {});
});

xdescribe('testing the questions: selectNamesOfChildrenSelection', () => {
  it('should return all grandParents if no names or months have been selected', async () => {});

  it('should return the right grandParents if selectedMonths passed', async () => {});

  it('should return the right grandParents if selectedNames passed', async () => {});
});
