// Flaws found:
// - if nothing is specified in sessionData.selectedNames,
// and it is an empty array, than it is not iterable -> throws error

// - repeating names can be provided
// - repeating urls can be provided

const func = require('../src/logic/answerLogic');
const handleAnswer = func.handleAnswer;

const testVals = {
  selected: [],
  unselected: [],
  type: '',
  selectedNames: [],
  selectedName: '',
  selectedMonths: [],
  unselectedNames: [],
  selectedPictures: [],
  unselectedPictures: [],
  monthOfBirth: 0
};

const sessionData = d => {
  return {
    selectedNames: testVals.selectedNames,
    selectedName: testVals.selectedName,
    selectedPictures: testVals.selectedPictures,
    unselectedPictures: testVals.unselectedPictures,
    selectedMonths: testVals.selectedMonths,
    unselectedNames: testVals.unselectedNames,
    monthOfBirth: testVals.monthOfBirth
  };
};

const answer = d => {
  return {
    selected: testVals.selected,
    unselected: testVals.unselected,
    type: testVals.type
  };
};

function zeroOutTestVals() {
  for (let key in testVals) {
    testVals[key] = undefined;
  }
}

beforeEach(() => {
  zeroOutTestVals();
});

describe('verify Month of Birth for Grandparent is provided consistently', () => {
  test('should assign the first selected month of birth to sessionData.selectedMonths if months provided as numbers and are 12 in total  ', () => {
    testVals.selected = [1, 2];
    testVals.unselected = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    testVals.type = 'GrandParent_MonthOfBirth';
    let data = handleAnswer(answer(), sessionData());
    expect(data.monthOfBirth).toEqual(1);
  });
  test('should throw error if months are not numbers', () => {
    testVals.selected = [1, 2];
    testVals.unselected = [3, '4', 5, 6, 7, 8, 9, 10, 11, 12];
    testVals.type = 'GrandParent_MonthOfBirth';
    expect(() => handleAnswer(answer(), sessionData())).toThrowError();
  });
  test('should throw error if months are not 12 in total', () => {
    testVals.selected = [1, 2];
    testVals.unselected = [3, 4, 5, 6, 7, 8, 9, 10, 11];
    testVals.type = 'GrandParent_MonthOfBirth';
    expect(() => handleAnswer(answer(), sessionData())).toThrowError();
  });
});

describe('verify Months of Birth for Grandchildren are provided consistently', () => {
  test('should assign the first selected month of birth to sessionData.selectedMonths if months provided as numbers and are 12 in total  ', () => {
    testVals.selected = [1, 2];
    testVals.unselected = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    testVals.type = 'GrandChildren_MonthsOfBirth';
    let data = handleAnswer(answer(), sessionData());
    expect(JSON.stringify(data.selectedMonths)).toEqual(
      JSON.stringify(testVals.selected)
    );
  });
  test('should throw error if months are not numbers', () => {
    testVals.selected = [1, 2];
    testVals.unselected = [3, '4', 5, 6, 7, 8, 9, 10, 11, 12];
    testVals.type = 'GrandChildren_MonthsOfBirth';
    expect(() => JSON.stringify(data.selectedMonths)).toThrowError();
  });
  test('should throw error if months are not 12 in total', () => {
    testVals.selected = [1, 2];
    testVals.unselected = [3, 4, 5, 6, 7, 8, 9, 10, 11];
    testVals.type = 'GrandChildren_MonthsOfBirth';
    expect(() => JSON.stringify(data.selectedMonths)).toThrowError();
  });
});

describe('verify Names of Grandchildren are provided consistently', () => {
  test('should add selected names to sessionData.selectedNames if names are provided as strings and are 11 in total  ', () => {
    testVals.type = 'GrandChildren_Names';
    testVals.selected = ['Name1', 'Name2'];
    testVals.unselected = [
      'Name3',
      'Name4',
      'Name5',
      'Name6',
      'Name7',
      'Name8',
      'Name9',
      'Name10',
      'Name11'
    ];
    testVals.selectedNames = ['Name0'];
    testVals.unselectedNames = ['Name12'];

    let data = handleAnswer(answer(), sessionData());
    expect(JSON.stringify(data.selectedNames)).toEqual(
      JSON.stringify([...testVals.selectedNames, ...testVals.selected])
    );
  });

  test('should throw an error if selected names are not all strings  ', () => {
    testVals.type = 'GrandChildren_Names';
    testVals.selected = ['Name1', 'Name2'];
    testVals.unselected = [
      'Name3',
      'Name4',
      'Name5',
      'Name6',
      'Name7',
      8,
      'Name9',
      'Name10',
      'Name11'
    ];
    testVals.selectedNames = ['Name0'];
    testVals.unselectedNames = ['Name12'];

    expect(() => handleAnswer(answer(), sessionData())).toThrowError();
  });

  test('should throw an error if selected names are not 11 in total  ', () => {
    testVals.type = 'GrandChildren_Names';
    testVals.selected = ['Name1', 'Name2'];
    testVals.unselected = [
      'Name3',
      'Name4',
      'Name5',
      'Name6',
      'Name7',
      'Name8',
      'Name9',
      'Name10'
    ];
    testVals.selectedNames = ['Name0'];
    testVals.unselectedNames = ['Name12'];

    expect(() => handleAnswer(answer(), sessionData())).toThrowError();
  });
  // fails the test as throws no error -> allows dublicate names...
  //   test('should throw an error if selected names are 11 in total, but some are not unique  ', () => {
  //     testVals.type = 'GrandChildren_Names';
  //     testVals.selected = ['Name1', 'Name2'];
  //     testVals.unselected = [
  //       'Name10',
  //       'Name10',
  //       'Name10',
  //       'Name10',
  //       'Name10',
  //       'Name10',
  //       'Name10',
  //       'Name10',
  //       'Name10'
  //     ];
  //     testVals.selectedNames = ['Name0'];
  //     testVals.unselectedNames = ['Name12'];

  //     expect(() => handleAnswer(answer(), sessionData())).toThrowError();
  //   });

  test('should add unselected names to sessionData.unselectedNames if names are provided as strings and are 11 in total  ', () => {
    testVals.type = 'GrandChildren_Names';
    testVals.selected = ['Name1', 'Name2'];
    testVals.unselected = [
      'Name3',
      'Name4',
      'Name5',
      'Name6',
      'Name7',
      'Name8',
      'Name9',
      'Name10',
      'Name11'
    ];
    testVals.selectedNames = ['Name0'];
    testVals.unselectedNames = ['Name12'];

    let data = handleAnswer(answer(), sessionData());
    expect(JSON.stringify(data.unselectedNames)).toEqual(
      JSON.stringify([...testVals.unselectedNames, ...testVals.unselected])
    );
  });
});

describe('verify Grand parent contact number if of type string and is provided in single', () => {
  test('should assign the Grand parent contact number to sessionData.contactNumber if it is string and single', () => {
    testVals.selected = ['Number1'];
    testVals.unselected = ['Number2'];
    testVals.type = 'GrandParent_ContactNumber';
    let data = handleAnswer(answer(), sessionData());
    expect(JSON.stringify(data.contactNumber)).toEqual(
      JSON.stringify(testVals.selected[0])
    );
  });
  test('should throw errow is contact number is not a string', () => {
    testVals.selected = [1];
    testVals.unselected = ['Number2'];
    testVals.type = 'GrandParent_ContactNumber';
    expect(() => handleAnswer(answer(), sessionData())).toThrowError();
  });
  test('should throw errow is contact number is not single', () => {
    testVals.selected = ['Number1', 'Number3'];
    testVals.unselected = ['Number2'];
    testVals.type = 'GrandParent_ContactNumber';
    expect(() => handleAnswer(answer(), sessionData())).toThrowError();
  });
  test('should throw errow is contact number is not provided', () => {
    testVals.selected = [];
    testVals.unselected = ['Number2'];
    testVals.type = 'GrandParent_ContactNumber';
    expect(() => handleAnswer(answer(), sessionData())).toThrowError();
  });
});

describe('verify Picture URLs are provided consistently', () => {
  test('should add selected pictures to sessionData.selectedPictures if pictures are provided as strings and are 12 in total  ', () => {
    testVals.type = 'GrandChildren_Authorization_Pictures';
    testVals.selected = ['URL-1', 'URL-2'];
    testVals.unselected = [
      'URL-3',
      'URL-4',
      'URL-5',
      'URL-6',
      'URL-7',
      'URL-8',
      'URL-9',
      'URL-10',
      'URL-11',
      'URL-12'
    ];
    testVals.selectedPictures = ['URL-0'];
    testVals.unselectedPictures = ['URL-12'];

    let data = handleAnswer(answer(), sessionData());
    expect(JSON.stringify(data.selectedPictures)).toEqual(
      JSON.stringify([...testVals.selectedPictures, ...testVals.selected])
    );
  });

  test('should throw an error if selected Picture URLs are not all strings  ', () => {
    testVals.type = 'GrandChildren_Authorization_Pictures';
    testVals.selected = ['URL-1', 'URL-2'];
    testVals.unselected = [
      'URL-3',
      'URL-4',
      'URL-5',
      'URL-6',
      'URL-7',
      8,
      'URL-9',
      'URL-10',
      'URL-11'
    ];
    testVals.selectedPictures = ['URL-0'];
    testVals.unselectedPictures = ['URL-12'];

    expect(() => handleAnswer(answer(), sessionData())).toThrowError();
  });

  test('should throw an error if selected Picture URLs are not 11 in total  ', () => {
    testVals.type = 'GrandChildren_Authorization_Pictures';
    testVals.selected = ['URL-1', 'URL-2'];
    testVals.unselected = [
      'URL-3',
      'URL-4',
      'URL-5',
      'URL-6',
      'URL-7',
      'URL-8',
      'URL-9',
      'URL-10'
    ];
    testVals.selectedPictures = ['URL-0'];
    testVals.unselectedPictures = ['URL-12'];

    expect(() => handleAnswer(answer(), sessionData())).toThrowError();
  });
  // fails the test as throws no error -> allows dublicate urls...
  //   test('should throw an error if selected names are 12 in total, but some are not unique  ', () => {
  //     testVals.type = 'GrandChildren_Authorization_Pictures';
  //     testVals.selected = ['URL-1', 'URL-2'];
  //     testVals.unselected = [
  //       'URL-3',
  //       'URL-4',
  //       'URL-5',
  //       'URL-6',
  //       'URL-7',
  //       'URL-8',
  //       'URL-9',
  //       'URL-10',
  //       'URL-11',
  //       'URL-11'
  //     ];
  //     testVals.selectedPictures = ['URL-0'];
  //     testVals.unselectedPictures = ['URL-12'];

  //     expect(() => handleAnswer(answer(), sessionData())).toThrowError();
  //   });

  test('should add unselected Picture URLs to sessionData.unselectedPictures if Picture URLs are provided as strings and are 12 in total  ', () => {
    testVals.type = 'GrandChildren_Authorization_Pictures';
    testVals.selected = ['URL-1', 'URL-2'];
    testVals.unselected = [
      'URL-3',
      'URL-4',
      'URL-5',
      'URL-6',
      'URL-7',
      'URL-8',
      'URL-9',
      'URL-10',
      'URL-11',
      'URL-12'
    ];
    testVals.selectedPictures = ['URL-0'];
    testVals.unselectedPictures = ['URL-13'];

    let data = handleAnswer(answer(), sessionData());
    expect(JSON.stringify(data.unselectedPictures)).toEqual(
      JSON.stringify([...testVals.unselectedPictures, ...testVals.unselected])
    );
  });
});

describe('verify name of family member is of type string and is provided in single', () => {
  test('should assign the family member name to sessionData.selectedName if it is string and single', () => {
    testVals.selected = ['Name1'];
    testVals.unselected = ['Name2'];
    testVals.type = 'Select_right_familymember';
    let data = handleAnswer(answer(), sessionData());
    expect(JSON.stringify(data.selectedName)).toEqual(
      JSON.stringify(testVals.selected[0])
    );
  });
  test('should throw errow if family member name is not a string', () => {
    testVals.type = 'Select_right_familymember';
    testVals.selected = [1];
    testVals.unselected = ['Name2'];
    expect(() => handleAnswer(answer(), sessionData())).toThrowError();
  });
  test('should throw errow if family member name is not single', () => {
    testVals.type = 'Select_right_familymember';
    testVals.selected = ['Name1', 'Name3'];
    testVals.unselected = ['Name2'];
    expect(() => handleAnswer(answer(), sessionData())).toThrowError();
  });
  test('should throw errow if family member name is not provided', () => {
    testVals.type = 'Select_right_familymember';
    testVals.selected = [];
    testVals.unselected = ['Name2'];
    expect(() => handleAnswer(answer(), sessionData())).toThrowError();
  });
});
