const db = require('../db/schemas');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Steps

// First create Queries to see how it works for when children month , names

// expect a data element as such:
/**
 * 
    selectedNames: [],
    unselectedNames: [],
    selectedPictures: [],
    unselectedPictures: [],
    selectedMonths; [],
    unselectedMonths: []
 * 
 * @param {*} data 
 */
const dbQuery = async data => {
  const {
    selectedNames,
    unselectedNames,
    selectedUri,
    unselectedUri,
    selectedMonths
  } = data;

  let selectedNamesQuery, selectedPictureQuery, selectedMonthQuery;

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
  !selectedUri.length
    ? (selectedPictureQuery = {
        picture: {
          [Op.notIn]: unselectedUri
        }
      })
    : (selectedPictureQuery = {
        picture: {
          [Op.and]: [{ [Op.in]: selectedUri }, { [Op.notIn]: unselectedUri }]
        }
      });

  selectedMonthQuery = {
    monthOfBirth: {
      [Op.in]: selectedMonths
    }
  };

  const query_result1 = await db.grandParent.findAll({
    include: [
      {
        association: 'children',
        where: {
          [Op.and]: [
            selectedNamesQuery,
            selectedPictureQuery,
            selectedMonthQuery
          ]
        }
      }
    ]
  });
  return query_result1;
};

const test = async () => {
  const MockData = {
    selectedNames: [],
    unselectedNames: ['Eloisa'],
    selectedUri: [],
    unselectedUri: [],
    selectedMonths: [8]
  };
  const result = await dbQuery(MockData);
  // eslint-disable-next-line no-console
  console.log(result.length);
};

test();
