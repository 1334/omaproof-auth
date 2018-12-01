'use strict';
module.exports = (sequelize, DataTypes) => {
  const grandChild = sequelize.define(
    'grandChild',
    {
      firstname: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      picture: DataTypes.STRING,
      userId: DataTypes.STRING,
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
  grandChild.associate = function(models) {
    grandChild.belongsToMany(models.grandParent, {
      foreignKey: 'grandChildId',
      as: 'parents',
      through: models.relation
    });
  };
  return grandChild;
};
