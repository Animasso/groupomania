
const Sequelize = require("sequelize");
const sequelize = require('../config/db.config')


//db.users = require("./models/user.js")(sequelize, Sequelize);
//db.posts = require("./models/post.js")(sequelize, Sequelize);
//db.comments = require("./models/comment.js")(sequelize, Sequelize);

module.exports = sequelize;