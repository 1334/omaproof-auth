const db = require('../db/schemas');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getClientData = async id => {
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

const getGrandChildNames = (IDs, data) => {
  const { selectedNames, unselectedNames, selectedMonths } = data;
  let queriedNames = [...selectedNames, ...unselectedNames];
  let queriedNamesQuery, selectedMonthQuery;

  !queriedNames.length
    ? (queriedNamesQuery = {})
    : (queriedNamesQuery = {
        firstname: { [Op.notIn]: queriedNames }
      });

  !selectedMonths.length
    ? (selectedMonthQuery = {})
    : (selectedMonthQuery = {
        monthOfBirth: { [Op.in]: selectedMonths }
      });

  return db.grandChild.findAll({
    where: {
      [Op.and]: [queriedNamesQuery, selectedMonthQuery]
    },
    include: [
      {
        association: 'parents',
        where: {
          userId: {
            [Op.in]: IDs
          }
        },
        attributes: []
      }
    ],
    limit: 100,
    attributes: ['firstname']
  });
};

const getGrandParentUserIDs = async data => {
  const {
    selectedNames,
    unselectedNames,
    selectedMonths,
    monthOfBirth,
    contactNumber
  } = data;
  let selectedNamesQuery,
    selectedMonthQuery,
    selectedMonthOfBirth,
    contactNumberQuery;

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

  return db.grandParent
    .findAll({
      where: {
        [Op.and]: [selectedMonthOfBirth, contactNumberQuery]
      },
      include: [
        {
          association: 'children',
          where: {
            [Op.and]: [selectedNamesQuery, selectedMonthQuery]
          },
          attributes: []
        }
      ],
      attributes: ['userId']
    })
    .map(el => el.get({ plain: true }));
};

const createSession = async (token, data) => {
  return db.session.create({
    id: token,
    data: JSON.stringify(data)
  });
};

const retrieveSession = async token => {
  return db.session
    .findOne({
      where: { id: token }
    })
    .get({ plain: true });
};

module.exports = {
  getClientData,
  getGrandChildNames,
  getGrandParentUserIDs,
  createSession,
  retrieveSession
};
