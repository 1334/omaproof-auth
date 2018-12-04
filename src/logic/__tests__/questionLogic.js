const { questionProtocol } = require('../questionLogic');

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
    const getPBSD = jest.fn(() => [1, 2, 3]);
    const sessionData = getSessionData({
      monthOfBirth: 9,
      selectedMonths: [1, 9]
    });

    it('calls selectNamesOfChildrenSelection', async () => {
      expect(sessionData.isNames).toEqual(true);
      await questionProtocol(sessionData, questionsMock, getPBSD);
      expect(sessionData.isNames).toEqual(false);

      expect(
        questionsMock.selectNamesOfChildrenSelection
      ).toHaveBeenCalledTimes(1);
      expect(questionsMock.selectNamesOfChildrenSelection).toHaveBeenCalledWith(
        getPBSD(),
        sessionData
      );
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

  describe('when there are no names to select and more than 8 IDs', () => {
    const getPBSD = jest.fn(() => [1, 2, 3]);
    const sessionData = getSessionData({
      monthOfBirth: 9,
      selectedMonths: [1, 9],
      isNames: false
    });

    it('calls selectContactNumber', async () => {
      expect(sessionData.isPictures).toEqual(true);
      await questionProtocol(sessionData, questionsMock, getPBSD);
      expect(sessionData.isPictures).toEqual(false);

      expect(questionsMock.selectPictures).toHaveBeenCalledTimes(1);
      expect(questionsMock.selectPictures).toHaveBeenCalledWith(
        sessionData,
        getPBSD()
      );
    });
  });

  describe('when there is more than 1 IDs and isGrandParentNameSelection', () => {
    const getPBSD = jest.fn(() => [1, 2, 3]);
    const sessionData = getSessionData({
      monthOfBirth: 9,
      selectedMonths: [1, 9],
      isNames: false,
      isPictures: false,
      isGrandParentNameSelection: true
    });

    it('calls selectContactNumber', async () => {
      expect(sessionData.isGrandParentNameSelection).toEqual(true);
      await questionProtocol(sessionData, questionsMock, getPBSD);
      expect(sessionData.isGrandParentNameSelection).toEqual(false);

      expect(questionsMock.selectGrandParentName).toHaveBeenCalledTimes(1);
      expect(questionsMock.selectGrandParentName).toHaveBeenCalledWith(
        sessionData,
        getPBSD()
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
