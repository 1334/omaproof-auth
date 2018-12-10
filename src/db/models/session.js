const db = require('../schemas');

const retrieveSession = async token => {
  const result = await db.session.findOne({
    where: { id: token }
  });
  return result.get({ plain: true });
};

const findOrCreateSession = async (token, data) => {
  return db.session
    .findOrCreate({
      where: {
        id: token
      }
    })
    .spread(session => {
      session.data = JSON.stringify(data);
      return session;
    })
    .then(session => session.save());
};

module.exports = {
  findOrCreateSession,
  retrieveSession
};
