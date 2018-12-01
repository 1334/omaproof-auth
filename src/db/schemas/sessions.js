'use strict';
module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define(
    'session',
    {
      data: DataTypes.JSON
    },
    {}
  );
  session.associate = function() {
    // associations can be defined here
  };
  return session;
};
