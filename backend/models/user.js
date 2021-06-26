const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config').sequelize;



const User = sequelize.define('User',{

  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize, 
  modelName: 'user' 
});

console.log(User === sequelize.models.User); 