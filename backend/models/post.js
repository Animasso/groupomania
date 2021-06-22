const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

class post extends Model {}

post.init({

  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  

}, {
  sequelize, 
  modelName: 'post' 
});

console.log(post === sequelize.models.post); 