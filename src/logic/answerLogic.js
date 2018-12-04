const handleAnswer = (answer, sessionData) => {
  switch (answer.type) {
    case 'GrandParent_MonthOfBirth':
      if (_isSingleSelection(answer) && _isConsistentType(answer, 'number')) {
        sessionData.monthOfBirth = answer.selected[0];
        return sessionData;
      }
      break;
    case 'GrandChildren_MonthsOfBirth':
      if (
        _isConsistentLength(answer, 12) &&
        _isConsistentType(answer, 'number')
      ) {
        sessionData.selectedMonths = answer.selected;
        return sessionData;
      }
      break;
    case 'GrandChildren_Names':
      if (
        _isConsistentLength(answer, 12) &&
        _isConsistentType(answer, 'string')
      ) {
        sessionData.selectedNames = [
          ...new Set([...sessionData.selectedNames, ...answer.selected])
        ];
        sessionData.unselectedNames = [
          ...new Set([...sessionData.unselectedNames, ...answer.unselected])
        ];
        return sessionData;
      }
      break;
    case 'GrandParent_ContactNumber':
      if (_isSingleSelection(answer) && _isConsistentType(answer, 'string')) {
        sessionData.contactNumber = answer.selected[0];
        return sessionData;
      }
      break;
    case 'GrandChildren_Authorization_Pictures':
      if (
        _isConsistentLength(answer, 12) &&
        _isConsistentType(answer, 'string')
      ) {
        sessionData.selectedPictures = [
          ...new Set([...sessionData.selectedPictures, ...answer.selected])
        ];
        sessionData.unselectedPictures = [
          ...new Set([...sessionData.unselectedPictures, ...answer.unselected])
        ];
        return sessionData;
      }
      break;
    case 'Select_right_familymember':
      if (_isSingleSelection(answer) && _isConsistentType(answer, 'string')) {
        sessionData.selectedName = answer.selected[0];
        return sessionData;
      }
  }
  throw new Error('Invalid handling answer');
};

const _isConsistentLength = (answer, length) => {
  return answer.selected.length + answer.unselected.length === length;
};

const _isConsistentType = (answer, type) => {
  return [...answer.selected, ...answer.unselected].every(
    x => typeof x === type
  );
};

const _isSingleSelection = answer => {
  return answer.selected.length === 1;
};

module.exports = {
  handleAnswer
};
