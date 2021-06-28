const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize, Sequelize) => sequelize.define("Comment", {
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize, 
  modelName: 'comment' 
});
