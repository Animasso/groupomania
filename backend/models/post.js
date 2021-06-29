const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => sequelize.define("Post", {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
}, {
  sequelize, 
  modelName: 'post' 
});




