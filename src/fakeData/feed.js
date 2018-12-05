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
  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
  ];
  grandMa.data.monthOfBirth = months[Math.round(Math.random() * 11)];
  grandMa.data.yearOfBirth = (1938 + Math.round(Math.random() * 30)).toString();
  grandMa.data.firstname = faker.name.firstName();
  grandMa.data.contactNumber = `+32 00 ${userId}`;
  userId++;
  const amount_grandChildren = 1 + Math.round(Math.random() * 9);

  for (let i = 0; i < amount_grandChildren; i++) {
    const kid = {};
    kid.firstname = faker.name.firstName();
    kid.monthOfBirth = months[Math.round(Math.random() * 11)];
    kid.userId = userId;
    kid.picture = `www.fakeurl.com/${userId}`;
    kid.yearOfBirth = selectYear(grandMa.data.yearOfBirth).toString();
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
  return +old + 36 + Math.round(Math.random() * (2017 - +old - 36));
};

const feeder = async x => {
  for (let i = 0; i < x; i++) {
    createGrandMother();
  }
};

const pictureFeeder = async () => {
  const { pictures } = require('./pictures.json');
  let count = 0;
  const max = pictures.length - 1;
  const grandChildren = await db.grandChild.findAll({});
  for (let i = 0; i < grandChildren.length; i++) {
    let picture = pictures[count].photo;
    await db.grandChild.update(
      {
        picture
      },
      {
        where: {
          id: grandChildren[i].id
        }
      }
    );
    count++;
    if (count >= max) count = 0;
  }
};

feeder(500);

pictureFeeder();
