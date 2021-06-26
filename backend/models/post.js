const {  DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config').sequelize



const Post = sequelize.define('Post',{

  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
}, {
  sequelize, 
  modelName: 'post' 
});

console.log(Post === sequelize.models.Post); 
