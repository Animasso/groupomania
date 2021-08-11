const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize, Sequelize) => sequelize.define("comment", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey : true,
    autoIncrement :true
  }, 
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  sequelize, 
  modelName: 'comment' 
});
