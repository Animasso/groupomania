const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const cryptojs = require("crypto-js");
const mailValidator = require('email-validator');
var passwordValidator = require('password-validator');
const db =require('../models/User')


var schema = new passwordValidator();
schema
.is().min(8)                                    
.is().max(100)                                  
.has().uppercase()                              
.has().lowercase()                              
.has().digits(2)                                
.has().not().spaces()                           
.is().not().oneOf(['Passw0rd', 'Password123']); 
 
exports.signup = (req, res, next) => {
const emailCrypt = cryptojs.HmacSHA256(req.body.email, 'secret key 123').toString();
if (!mailValidator.validate(req.body.email) || (!schema.validate(req.body.password))) {  
  throw { error: " invalide !" }  
} else if (mailValidator.validate(req.body.email) && (schema.validate(req.body.password)))
    bcrypt.hash(req.body.password, 10)

    .then(hash => {
      const user = new User({
        firstname: req.body.firstName,
        lastName:req.body.lastName,
        email: emailCrypt,
        password: hash
      });
      db.User.create(user)
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));  

};

exports.login = (req, res, next) => {
const emailCrypt = cryptojs.HmacSHA256(req.body.email, 'secret key 123').toString();

    db.User.findOne({
        where:{email: emailCrypt}  
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id, 
            token: jwt.sign(
                { userId: user.id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              ) 
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
}; 


exports.deleteUser = (req, res, next) => {
    db.User.findOne({ where: { id: req.params.id }})  
      .then((user) => {
          db.User.destroy({ where: { id: req.params.id }}) 
                    .then(() => res.status(200).json({ message: 'Compte supprimé' }))
                    .catch(error => res.status(400).json({ error }));
                })
            .catch (error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    db.User.findOne({ where: { id: req.params.id }})
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
    db.User.findAll()
        .then((users) => res.status(200).json(users))
        console.log(users)
        .catch(error => res.status(400).json({ error }));
};