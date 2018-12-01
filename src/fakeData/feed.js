const faker = require('faker');
faker.locale = 'es';
// Create fake data
const db = require('../db/schemas');

let { userId } = require('./fakeNews.json');

const createGrandMother = async () => {
  const grandMa = {
    data: {},
    kids: []
  };
  grandMa.data.userId = userId;
  // select a year between 50 and 80;
  grandMa.data.monthOfBirth = 1 + Math.round(Math.random() * 11);
  grandMa.data.dateOfBirth = new Date(
    Date.UTC(
      1938 + Math.round(Math.random() * 30),
      grandMa.data.monthOfBirth,
      1
    )
  );
  grandMa.data.firstname = faker.name.firstName();
  userId++;
  const amount_grandChildren = 1 + Math.round(Math.random() * 7);
  for (let i = 0; i < amount_grandChildren; i++) {
    const kid = {};
    kid.firstname = faker.name.firstName();
    kid.monthOfBirth = 1 + Math.round(Math.random() * 11);
    kid.userId = userId;
    kid.picture = `www.fakeurl.com/${userId}`;
    kid.dateOfBirth = new Date(
      Date.UTC(selectYear(grandMa.data.dateOfBirth), kid.monthOfBirth, 1)
    );
    userId++;
    grandMa.kids.push(kid);
  }
  const grandParent = await db.grandParent.create({
    ...grandMa.data
  });
  const kids = await Promise.all(
    grandMa.kids.map(el => db.grandChild.create({ ...el }))
  );
  return Promise.all(
    kids.map(el => {
      db.relation.create({
        grandChildId: el.id,
        grandParentId: grandParent.id
      });
    })
  );
};

const selectYear = oldDate => {
  const old = oldDate.getFullYear();
  return old + 36 + Math.round(Math.random() * (2017 - old - 36));
};

const test = async x => {
  for (let i = 0; i < x; i++) {
    createGrandMother();
  }
};

test(250);
