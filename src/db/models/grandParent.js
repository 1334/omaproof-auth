const db = require('../schemas');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getGrandParentsBySessionData = async (
  sessionData,
  attributes = ['userId']
) => {
  if (!sessionData) throw new Error('Invalid sessiondata');
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

  console.log(selectedNames);
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

  console.log('selectedNamesQuery: ', selectedNamesQuery);

  !selectedMonths.length
    ? (selectedMonthQuery = {})
    : (selectedMonthQuery = {
        monthOfBirth: {
          [Op.in]: selectedMonths
        }
      });

  console.log('selectedMonths: ', selectedMonthQuery);

  !monthOfBirth
    ? (selectedMonthOfBirth = {})
    : (selectedMonthOfBirth = {
        monthOfBirth: monthOfBirth
      });

  console.log('monthOfBirth: ', selectedMonthOfBirth);

  !contactNumber
    ? (contactNumberQuery = {})
    : (contactNumberQuery = {
        contactNumber: contactNumber
      });

  console.log('contact: ', contactNumberQuery);

  !grandParentName
    ? (nameQuery = {})
    : (nameQuery = {
        firstname: grandParentName
      });

  console.log('GP name: ', nameQuery);

  !selectedPictures.length
    ? (selectedPicturesQuery = {
        picture: {
          [Op.notIn]: unselectedPictures
        }
      })
    : (selectedPicturesQuery = {
        picture: {
          [Op.and]: [
            { [Op.in]: selectedPictures },
            { [Op.notIn]: unselectedPictures }
          ]
        }
      });

  console.log('Picture: ', selectedPicturesQuery);

  return db.grandParent
    .findAll({
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
    })
    .map(el => el.get({ plain: true }));
};

const getGrandParentByDatabaseId = async id => {
  return db.grandParent
    .findAll({
      where: {
        id: id
      },
      include: [
        {
          association: 'children'
        }
      ]
    })
    .map(el => el.get({ plain: true }))[0];
};

const getAllGrandParentsExceptIDs = async (IDs, attributes) => {
  return db.grandParent
    .findAll({
      where: {
        userId: {
          [Op.notIn]: IDs
        }
      },
      attributes: attributes
    })
    .map(el => el.get({ plain: true }));
};

module.exports = {
  getGrandParentsBySessionData,
  getGrandParentByDatabaseId,
  getAllGrandParentsExceptIDs
};
