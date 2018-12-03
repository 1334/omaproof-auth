const db = require('../schemas');
const Sequelize = require('sequelize');

const retrieveSession = async token => {
  return db.session
    .findOne({
      where: { id: token }
    })
    .get({ plain: true });
};

const findOrCreateSession = async (token, data) => {
  return db.session
    .findorCreate({
      where: {
        id: token
      }
    })
    .spread(session => {
      session.data = JSON.stringify(data);
    })
    .then(session => session.save());
};

module.exports = {
  findOrCreateSession,
  retrieveSession
};
