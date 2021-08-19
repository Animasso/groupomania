const dbConfig = require("../config/db.config.js");
require('dotenv').config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.SQL_DATABASE_NAME,process.env.SQL_USER,process.env.SQL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.posts = require("./post.js")(sequelize, Sequelize);
db.users = require("./user.js")(sequelize, Sequelize)
db.comments = require("./comment.js")(sequelize, Sequelize)

db.users.hasMany(db.posts)
db.posts.belongsTo(db.users)

db.posts.hasMany(db.comments)
db.comments.belongsTo(db.posts)

db.users.hasMany(db.comments)
db.comments.belongsTo(db.users)

db.sequelize.sync({ alter:true });

module.exports = db;
