// const db = require('../db/schemas');
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;
// const uuidv4 = require('uuid/v4');

// // Steps

// // First create Queries to see how it works for when children month , names

// // expect a data element as such:
// /**
//  *
//     selectedNames: [],
//     unselectedNames: [],
//     selectedPictures: [],
//     unselectedPictures: [],
//     selectedMonths; [],
//     unselectedMonths: []
//  *
//  * @param {*} data
//  */

// const dbQuery = async data => {
//   const { selectedNames, unselectedNames, selectedMonths, monthOfBirth } = data;
//   let selectedNamesQuery, selectedMonthQuery, selectedMonthOfBirth;

//   !selectedNames.length
//     ? (selectedNamesQuery = {
//         firstname: {
//           [Op.notIn]: unselectedNames
//         }
//       })
//     : (selectedNamesQuery = {
//         firstname: {
//           [Op.and]: [
//             { [Op.in]: selectedNames },
//             { [Op.notIn]: unselectedNames }
//           ]
//         }
//       });

//   selectedMonthQuery = {
//     monthOfBirth: {
//       [Op.in]: selectedMonths
//     }
//   };

//   !monthOfBirth
//     ? (selectedMonthOfBirth = {})
//     : (selectedMonthOfBirth = {
//         monthOfBirth: monthOfBirth
//       });

//   return db.grandParent
//     .findAll({
//       where: selectedMonthOfBirth,
//       include: [
//         {
//           association: 'children',
//           where: {
//             [Op.and]: [selectedNamesQuery, selectedMonthQuery]
//           },
//           attributes: []
//         }
//       ],
//       attributes: ['userId']
//     })
//     .map(el => el.get({ plain: true }));
// };

// const getChildrenForQuiz = async (remainingGPIDs, amount = 8, limit = 300) => {
//   let names = [];
//   let result = [];
//   const query_result1 = await db.grandChild.findAll({
//     include: [
//       {
//         association: 'parents',
//         where: {
//           id: {
//             [Op.in]: remainingGPIDs
//           }
//         }
//       }
//     ],
//     limit: limit
//   });
//   while (names.length <= amount) {
//     let sel = Math.round(Math.random() * (query_result1.length - 1));
//     let selected = query_result1[sel];
//     if (names.indexOf(selected.firstname) < 0) {
//       names.push(selected.firstname);
//       result.push(selected);
//     }
//   }
//   return result;
// };

// // Request for login;

// const firstQuery = async () => {
//   const token = uuidv4();
//   const IDs = await db.grandParent.findAll({
//     attributes: ['userId']
//   });
//   const data = {
//     selectedNames: [],
//     unselectedNames: [],
//     selectedMonths: []
//   };
//   await db.session.create({
//     id: token,
//     data: JSON.stringify(data)
//   });
//   const selectedIDs = [...new Array(10)].map(
//     () => IDs[Math.round(Math.random() * (IDs.length - 1))]['userId']
//   );
//   let grandChildren = await retrieveGrandChildren(selectedIDs, 8);
//   return {
//     token: token,
//     data: data,
//     question: grandChildren
//   };
// };

// const testDrive = async id => {
//   let counter = 0;
//   const data = {
//     selectedNames: [],
//     unselectedNames: [],
//     selectedMonths: [],
//     monthOfBirth: null
//   };
//   let testGrandParent = await db.grandParent
//     .findAll({
//       where: {
//         id: id
//       },
//       include: [
//         {
//           association: 'children'
//         }
//       ]
//     })
//     .map(el => el.get({ plain: true }));
//   testGrandParent = testGrandParent[0];
//   //Follow the process as it would be done by client;
//   // Fill in the months where your G-kids are born;
//   data.selectedMonths = [
//     ...new Set(testGrandParent.children.map(el => el.monthOfBirth))
//   ];
//   const kids = testGrandParent.children.map(el => el.firstname);
//   // Select your own month
//   data.monthOfBirth = testGrandParent.monthOfBirth;

//   let GPIDs = await dbQuery(data);
//   GPIDs = GPIDs.map(el => el.userId);

//   while (GPIDs.length >= 3 && counter <= 25) {
//     // Using the remaining GPIDs draw a selection of names to choose from
//     let drawnNames = await drawNames(GPIDs, data);
//     // Client responds based on these names
//     drawnNames.forEach(el => {
//       const name = el.firstname;
//       kids.indexOf(name) < 0
//         ? data.unselectedNames.push(name)
//         : data.selectedNames.push(name);
//     });
//     // Using the additional data get remaining GPIDs
//     GPIDs = await dbQuery(data);
//     GPIDs = GPIDs.map(el => el.userId);
//     counter++;
//   }
//   return counter;
// };

// const drawNames = async (IDs, data) => {
//   const { selectedNames, unselectedNames, selectedMonths } = data;
//   let unselectedNamesQuery, selectedMonthQuery;
//   !unselectedNames.length
//     ? (unselectedNamesQuery = {})
//     : (unselectedNamesQuery = {
//         firstname: { [Op.notIn]: unselectedNames }
//       });

//   !selectedMonths.length
//     ? (selectedMonthQuery = {})
//     : (selectedMonthQuery = {
//         monthOfBirth: { [Op.in]: selectedMonths }
//       });

//   const result = await db.grandChild.findAll({
//     where: {
//       [Op.and]: [unselectedNamesQuery, selectedMonthQuery]
//     },
//     include: [
//       {
//         association: 'parents',
//         where: {
//           userId: {
//             [Op.in]: IDs
//           }
//         },
//         attributes: []
//       }
//     ],
//     limit: 100,
//     attributes: ['firstname']
//   });

//   let queriedNames = new Set(
//     result.map(el => el.get({ plain: true }).firstname)
//   );
//   let testedNames = new Set([...selectedNames, ...unselectedNames]);
//   let remainingNames = [...difference(testedNames, queriedNames)];
//   let draw = _randomNumberGenerator(0, remainingNames.length - 1, 8);
//   console.log('remaining names length: ', remainingNames.length);
//   console.log('draw: ', draw);
//   return draw.map(el => remainingNames[el]);
// };

// const difference = (setA, setB) => {
//   var _difference = new Set(setA);
//   for (var elem of setB) {
//     _difference.delete(elem);
//   }
//   return _difference;
// };

// const analysis = async () => {
//   let result = [];
//   for (let i = 99; i < 100; i++) {
//     const test = await testDrive(i);
//     result.push({ i, counter: test });
//   }
//   console.log(result);
// };

// const _randomNumberGenerator = (min, max, amount, recurring = false) => {
//   const draw = [];
//   if (recurring) {
//     while (draw.length < amount) {
//       draw.push(min + Math.round(Math.random() * (max - min)));
//     }
//   } else {
//     while (draw.length < amount) {
//       let num = min + Math.round(Math.random() * (max - min));
//       if (draw.indexOf(num) < 0) draw.push(num);
//     }
//   }
//   return draw;
// };

// analysis();
