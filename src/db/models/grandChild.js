const db = require('../schemas');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getGrandChildrenByGPId = async (userId, amount, attributes) => {
  const result = await db.grandChild.findAll({
    include: [
      {
        association: 'parents',
        where: {
          userId: userId
        },
        attributes: []
      }
    ],
    limit: amount,
    attributes: attributes
  });
  return result.map(el => el.get({ plain: true }));
};

const getGrandChildrenBySessionData = (
  IDs,
  sessionData,
  attributes,
  amount = 100
) => {
  const { selectedNames, unselectedNames, selectedMonths } = sessionData;
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

  return db.grandChild
    .findAll({
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
      limit: amount,
      attributes: attributes
    })
    .then(result => result.map(el => el.get({ plain: true })));
};

module.exports = {
  getGrandChildrenBySessionData,
  getGrandChildrenByGPId
};
