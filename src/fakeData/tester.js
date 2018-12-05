const { getGrandChildrenBySessionData } = require('../db/models/grandChild');
const { getGrandParentsBySessionData } = require('../db/models/grandParent');

const sessionData = {
  // data from the client
  selectedNames: [],
  unselectedNames: ['Winfield'],
  selectedMonths: ['nov', 'jul', 'aug', 'mar', 'jun', 'apr'],
  selectedPictures: [],
  unselectedPictures: [],
  monthOfBirth: ['apr'],
  contactNumber: null,
  selectedName: null,
  // to support decision making
  progress: [],
  isNames: true,
  isPictures: true,
  isGrandParentNameSelection: true
};

const testThis = async () => {
  const userId = ['2305', '2216'];
  const names = await getGrandChildrenBySessionData(userId, sessionData, [
    'firstname'
  ]);
  console.log(names);
};

const testThat = async () => {
  const names = await getGrandParentsBySessionData(sessionData);
  console.log(names);
};

testThat();

// "data": {
//   "userId": 2305,
//   "monthOfBirth": "apr",
//   "yearOfBirth": "1942",
//   "firstname": "King",
//   "contactNumber": "+32 00 2305"
// },
// "kids": [
//   {
//     "firstname": "Winfield",
//     "monthOfBirth": "nov",
//   },
//   {
//     "firstname": "Joshuah",
//     "monthOfBirth": "nov",
//   },
//   {
//     "firstname": "Jacky",
//     "monthOfBirth": "jul",
//   },
//   {
//     "firstname": "Lurline",
//     "monthOfBirth": "aug",
//   },
//   {
//     "firstname": "Joanne",
//     "monthOfBirth": "mar",
//   },
//   {
//     "firstname": "Cecil",
//     "monthOfBirth": "jun",
//   },
//   {
//     "firstname": "Ulices",
//     "monthOfBirth": "apr",
//   }
// ]
// }
