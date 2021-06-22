const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

class comment extends Model {}

post.init({

  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  

}, {
  sequelize, 
  modelName: 'comment' 
});

console.log(comment === sequelize.models.comment); 