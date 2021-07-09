const Sequelize = require('sequelize');
const sequelize = new Sequelize('groupomania','root','Animasso1170', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  const db = {};

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;


module.exports = db;