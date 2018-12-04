const db = require('../schemas');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getGrandParentsBySessionData = async (
  sessionData,
  attributes = ['userId']
) => {
  const {
    selectedNames,
    unselectedNames,
    selectedMonths,
    monthOfBirth,
    contactNumber,
    grandParentName,
    selectedPictures,
    unselectedPictures
  } = sessionData;
  let selectedNamesQuery,
    selectedMonthQuery,
    selectedMonthOfBirth,
    selectedPicturesQuery,
    contactNumberQuery,
    nameQuery;

  !selectedNames.length
    ? (selectedNamesQuery = {
        firstname: {
          [Op.notIn]: unselectedNames
        }
      })
    : (selectedNamesQuery = {
        firstname: {
          [Op.and]: [
            { [Op.in]: selectedNames },
            { [Op.notIn]: unselectedNames }
          ]
        }
      });

  !selectedMonths.length
    ? (selectedMonthQuery = {})
    : (selectedMonthQuery = {
        monthOfBirth: {
          [Op.in]: selectedMonths
        }
      });

  !monthOfBirth
    ? (selectedMonthOfBirth = {})
    : (selectedMonthOfBirth = {
        monthOfBirth: monthOfBirth
      });

  !contactNumber
    ? (contactNumberQuery = {})
    : (contactNumberQuery = {
        contactNumber: contactNumber
      });

  !grandParentName
    ? (nameQuery = {})
    : (nameQuery = {
        firstname: grandParentName
      });

  selectedPicturesQuery = {};

  if (selectedPictures.length) {
    selectedPicturesQuery = {
      picture: {
        [Op.and]: [
          { [Op.in]: selectedPictures },
          { [Op.notIn]: unselectedPictures }
        ]
      }
    };
    selectedNamesQuery = {};
  }

  let result = await db.grandParent.findAll({
    where: {
      [Op.and]: [selectedMonthOfBirth, contactNumberQuery, nameQuery]
    },
    include: [
      {
        association: 'children',
        where: {
          [Op.and]: [
            selectedNamesQuery,
            selectedMonthQuery,
            selectedPicturesQuery
          ]
        },
        attributes: []
      }
    ],
    attributes: attributes
  });
  result = result.map(el => el.get({ plain: true }));
  return result;
};

const getGrandParentByDatabaseId = async id => {
  const result = await db.grandParent.findAll({
    where: {
      id: id
    },
    include: [
      {
        association: 'children'
      }
    ]
  });
  return result.map(el => el.get({ plain: true }))[0];
};

const getAllGrandParentsExceptIDs = async (IDs, attributes, amount = 12) => {
  const result = await db.grandParent.findAll({
    where: {
      userId: {
        [Op.notIn]: IDs
      }
    },
    attributes: attributes,
    limit: amount
  });
  return result.map(el => el.get({ plain: true }));
};

module.exports = {
  getGrandParentsBySessionData,
  getGrandParentByDatabaseId,
  getAllGrandParentsExceptIDs
};
