const faker = require('faker');
faker.locale = 'es';
// Create fake data

let { userId } = require('./fakeData/fakeNews.json');

const createGrandMother = () => {
  const grandMa = {
    data: {},
    kids: []
  };
  grandMa.data.userId = userId;
  // select a year between 50 and 80;
  grandMa.data.monthOfBirth = Math.round(Math.random() * 12);
  grandMa.data.dateOfBirth = new Date(
    Date.UTC(
      1938 + Math.round(Math.random() * 30),
      grandMa.data.monthOfBirth,
      1
    )
  );
  grandMa.data.firstname = faker.name.firstName();
  userId++;
  const amount_grandChildren = Math.round(Math.random() * 8);
  for (let i = 0; i < amount_grandChildren; i++) {
    const kid = {};
    kid.firstname = faker.name.firstName();
    kid.monthOfBirth = Math.round(Math.random() * 12);
    kid.userId = userId;
    kid.picture = `www.fakeurl.com/${userId}`;
    userId++;
    grandMa.kids.push(kid);
  }
  // eslint-disable-next-line no-console
  console.log(grandMa.data);
  // eslint-disable-next-line no-console
  console.log(grandMa.kids);
};

createGrandMother();

// General idea:

// User is presented with 9 names twice
