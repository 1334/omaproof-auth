'use strict';
module.exports = (sequelize, DataTypes) => {
  const grandParent = sequelize.define(
    'grandParent',
    {
      userId: DataTypes.STRING,
      password: DataTypes.STRING,
      contactNumber: DataTypes.STRING,
      firstname: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      monthOfBirth: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 12
        }
      }
    },
    {}
  );
  grandParent.associate = function(models) {
    grandParent.belongsToMany(models.grandChild, {
      foreignKey: 'grandParentId',
      through: models.relation,
      as: 'children'
    });
  };
  return grandParent;
};
