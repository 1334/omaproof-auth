const faker = require('faker');
// Create fake data
const db = require('../db/schemas');
const fs = require('fs');
let { userId } = require('./fakeNews.json');

const createGrandMother = async () => {
  const grandMa = {
    data: {},
    kids: []
  };
  grandMa.data.userId = userId;
  // select a year between 50 and 80;
  grandMa.data.monthOfBirth = 1 + Math.round(Math.random() * 11);
  grandMa.data.yearOfBirth = 1938 + Math.round(Math.random() * 30);
  grandMa.data.firstname = faker.name.firstName();
  grandMa.data.password = grandMa.data.firstname;
  grandMa.data.contactNumber = `+32 00 ${userId}`;
  userId++;
  const amount_grandChildren = 1 + Math.round(Math.random() * 9);

  for (let i = 0; i < amount_grandChildren; i++) {
    const kid = {};
    kid.firstname = faker.name.firstName();
    kid.monthOfBirth = 1 + Math.round(Math.random() * 11);
    kid.userId = userId;
    kid.picture = `www.fakeurl.com/${userId}`;
    kid.yearOfBirth = selectYear(grandMa.data.yearOfBirth);
    userId++;
    grandMa.kids.push(kid);
  }
  const grandParent = await db.grandParent.create({
    ...grandMa.data
  });
  const kids = await Promise.all(
    grandMa.kids.map(el => db.grandChild.create({ ...el }))
  );

  fs.appendFile('TestData.txt', JSON.stringify(grandMa, null, 2), () => {});

  return Promise.all(
    kids.map(el => {
      db.relation.create({
        grandChildId: el.id,
        grandParentId: grandParent.id
      });
    })
  );
};

const selectYear = old => {
  return old + 36 + Math.round(Math.random() * (2017 - old - 36));
};

const test = async x => {
  for (let i = 0; i < x; i++) {
    createGrandMother();
  }
};

//test(500);
