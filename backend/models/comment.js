const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config').sequelize



const Comment = sequelize.define('Comment',{

  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  

}, {
  sequelize, 
  modelName: 'comment' 
});

console.log(Comment === sequelize.models.Comment); 