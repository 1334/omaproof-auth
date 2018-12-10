const { questionProtocol } = require('../src/logic/questionLogic');

describe('questionProtocol', () => {
  const questionsMock = {
    monthOfBirthSelection: jest.fn(() => ({
      type: 'GrandParent_MonthOfBirth'
    })),
    selectMonthsOfChildrenSelection: jest.fn(() => ({
      type: 'GrandChildren_MonthsOfBirth'
    })),

    selectNamesOfChildrenSelection: jest.fn(),
    selectContactNumber: jest.fn(),
    selectPictures: jest.fn(),
    selectGrandParentName: jest.fn()
  };

  describe('when we have no month of birth', () => {
    it('returns monthOfBirthSelection function', async () => {
      const sessionData = getSessionData({ monthOfBirth: null });
      const result = await questionProtocol(sessionData, questionsMock);
      expect(questionsMock.monthOfBirthSelection).toHaveBeenCalledTimes(1);
      expect(questionsMock.monthOfBirthSelection).toHaveBeenCalledWith();
      expect(result.type).toEqual('GrandParent_MonthOfBirth');
    });
  });

  describe('when there are no grandchildren selected months', () => {
    it('returns selectMonthsOfChildrenSelection function', async () => {
      const sessionData = getSessionData({
        monthOfBirth: 9,
        selectedMonths: []
      });

      const result = await questionProtocol(sessionData, questionsMock);
      expect(
        questionsMock.selectMonthsOfChildrenSelection
      ).toHaveBeenCalledTimes(1);
      expect(
        questionsMock.selectMonthsOfChildrenSelection
      ).toHaveBeenCalledWith();
      expect(result.type).toEqual('GrandChildren_MonthsOfBirth');
    });
  });

  describe('when there are no names to select and less than 8 IDs', () => {
    const getPBSD = jest.fn(() => [
      { userId: 1 },
      { userId: 2 },
      { userId: 3 },
      { userId: 4 },
      { userId: 5 }
    ]);
    const PBSD = [1, 2, 3, 4, 5];
    const sessionData = getSessionData({
      monthOfBirth: 'sep',
      selectedMonths: ['jan', 'sep']
    });

    it('calls selectNamesOfChildrenSelection', async () => {
      expect(sessionData.isNames).toEqual(true);
      await questionProtocol(sessionData, questionsMock, getPBSD);
      expect(sessionData.isNames).toEqual(false);
      expect(questionsMock.selectPictures).toHaveBeenCalledTimes(1);
      expect(questionsMock.selectPictures).toHaveBeenCalledWith(PBSD);
    });
  });

  describe('when there are no names to select and more than 8 IDs', () => {
    const getPBSD = jest.fn(() => [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const sessionData = getSessionData({
      monthOfBirth: 9,
      selectedMonths: [1, 9],
      isNames: false
    });

    it('calls selectContactNumber', async () => {
      expect(sessionData.isNames).toEqual(false);
      await questionProtocol(sessionData, questionsMock, getPBSD);
      expect(questionsMock.selectContactNumber).toHaveBeenCalledTimes(1);
      expect(questionsMock.selectContactNumber).toHaveBeenCalledWith();
    });
  });

  describe('when there is more than 1 IDs and isGrandParentNameSelection', () => {
    const sessionData = getSessionData({
      monthOfBirth: 9,
      selectedMonths: [1, 9],
      isNames: false,
      isPictures: false,
      isGrandParentNameSelection: true
    });
    const getPBSD = jest.fn(() => [
      { userId: 1 },
      { userId: 2 },
      { userId: 3 }
    ]);
    const PBSD = [1, 2, 3];

    it('calls selectContactNumber', async () => {
      expect(sessionData.isGrandParentNameSelection).toEqual(true);
      await questionProtocol(sessionData, questionsMock, getPBSD);
      expect(sessionData.isGrandParentNameSelection).toEqual(false);
      expect(questionsMock.selectGrandParentName).toHaveBeenCalledTimes(1);
      expect(questionsMock.selectGrandParentName).toHaveBeenCalledWith(
        sessionData,
        PBSD
      );
    });
  });

  describe('when there is only 1 ID left', () => {
    const getPBSD = jest.fn(() => [1]);
    const sessionData = getSessionData({
      monthOfBirth: 9,
      selectedMonths: [1, 9],
      isNames: false,
      isPictures: false,
      isGrandParentNameSelection: false
    });

    it('calls selectContactNumber', async () => {
      const result = await questionProtocol(
        sessionData,
        questionsMock,
        getPBSD
      );

      expect(result.type).toEqual('success');
    });
  });

  describe('when there are no IDs left', () => {
    const getPBSD = jest.fn(() => []);
    const sessionData = getSessionData({
      monthOfBirth: 'sep',
      selectedMonths: ['jan', 'sep'],
      isNames: false,
      isPictures: false,
      isGrandParentNameSelection: false
    });

    it('calls selectContactNumber', async () => {
      const result = await questionProtocol(
        sessionData,
        questionsMock,
        getPBSD
      );

      expect(result.type).toEqual('failure');
    });
  });
});

function getSessionData(params = {}) {
  return {
    selectedMonths: null,
    monthOfBirth: null,
    progress: [],
    isNames: true,
    isGrandParentNameSelection: true,
    isPictures: true,
    ...params
  };
}
