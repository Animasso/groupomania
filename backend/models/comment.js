const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize, Sequelize) => sequelize.define("comment", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey : true,
    autoIncrement :true
  },
  post_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize, 
  modelName: 'comment' 
});
