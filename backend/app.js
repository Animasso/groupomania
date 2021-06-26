const express = require('express');
const bodyParser = require('body-parser');
//package qui est utilisé pour la gestion et la transformation des chemins de ‎‎fichiers‎
const path = require('path');
const rateLimit = require("express-rate-limit");
//met les valeurs de donnée importante dans un fichier .env pour les cacher
require("dotenv").config();
//configure de manière appropriée des en-têtes HTTP pour protéger de certaines vulnérabilités
const helmet = require('helmet')
const auth = require('./middleware/auth')



const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per windowMs
});


const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const app = express();

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });


app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});
app.use(express.json());
app.use(helmet());
app.use(limiter);

const db =require('./models')
db.sequelize.sync()


app.use('/api/users',auth , userRoutes); 
app.use('/api/posts', auth, postRoutes); 
app.use('/api/comments', auth, commentRoutes); 
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;