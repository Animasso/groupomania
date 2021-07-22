const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey : true,
    autoIncrement :true
  },
  user_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
},

 {
  sequelize, 
  modelName: 'post' 
 
});





