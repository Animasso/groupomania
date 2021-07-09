const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailValidator = require('email-validator');
var passwordValidator = require('password-validator');
const models =require('../models/index.js')

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
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            models.users.create({
                firstName : req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
            })
            .then((users) => res.status(201).json({message: 'Utilisateur crée !'}))
            .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
}
exports.login = (req, res, next) => {

    models.users.findOne({
      where: { email: req.body.email }    
    })
    .then(users => {
      if (!users) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: users.id, 
            token: jwt.sign(
                { userId: users.id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              ) 
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
}; 


exports.deleteUser = (req, res, next) => {
    models.users.findOne({ where: { id: req.params.id }})  
      .then(() => {
          models.users.destroy({ where: { id: req.params.id }}) 
                    .then((user) => res.status(200).json(user)
                    ({ message: 'Compte supprimé' }))
                    .catch(error => res.status(400).json({ error }));
                })
            .catch (error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    models.users.findOne
    ({ where: { id: req.params.id }})
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
    models.users.findAll({attributes: ['id', 'email','firstName','lastName']}) 
        .then((users) => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

 