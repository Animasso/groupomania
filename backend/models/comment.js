const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize, Sequelize) => sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey : true,
    autoIncrement :true
  },
  fk_postId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize, 
  modelName: 'comment' 
});
