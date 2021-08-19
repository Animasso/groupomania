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


app.use(express.json());


app.use('/api/users', userRoutes); 
app.use('/api/auth/posts', postRoutes); 
app.use('/api/auth/comments', commentRoutes); 
app.use('/images', express.static(path.join(__dirname, 'images')));



app.use(helmet());
app.use(limiter);







module.exports = app;