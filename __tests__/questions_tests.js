const { randomNumberGenerator } = require('../src/logic/helperFunctions');

describe('testing the randomgenerator', () => {
  const result = randomNumberGenerator(0, 10, 10);
  it('should return an array of the requested length', () => {
    expect(result.length).toEqual(10);
  });

  it('should not have any recurring numbers', () => {
    const test = result.every(el => result.indexOf(el) < 0);
    expect(test).toBeTruthy;
  });

  it('should have numbers within the right bounds', () => {
    expect(Math.max(...result)).toBeLessThan(11);
    expect(Math.min(...result)).toBeGreaterThan(-1);
  });
});

xdescribe('testing the questions: selectPictures', () => {
  it('should return all grandParents if no names or months have been selected', async () => {});

  it('should return the right grandParents if selectedMonths passed', async () => {});

  it('should return the right grandParents if selectedNames passed', async () => {});
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
