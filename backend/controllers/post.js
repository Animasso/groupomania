const fs = require('fs'); 
const models=require('../models/index.js')


exports.deletePost = (req, res, next) => {
    // nous utilisons l'ID que nous recevons comme paramètre pour accéder au post correspondant dans la base de données 
            models.posts.findOne ({ 
                where: { id: req.params.id }})          
                  models.posts.destroy({where:{id: req.params.id }})
                    .then(() => res.status(200).json({ message: 'post supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            
};

exports.createPost = (req, res, next) => {
if (!req.file) {
    models.posts.create({
        ...req.body,
        imageUrl: "",
    })
        .then((post) => res.status(201).json({post}))
        .catch((error) => res.status(500).json(error));

    } else if (req.file) {
        models.posts.create({
            ...req.body,
            UserId: userId,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
            }`,
        })
            .then((post) => res.status(201).json({post}))
            .catch((error) => res.status(500).json(error));
    }
};
exports.modifyPost = (req, res, next) => {

  try {
      models.posts.findOne({
          where: {
              id: (req.params.id)
          }
      });
      models.posts.update({
          content: req.body.content
      }, {
          where: {
              id: (req.params.id)
          }
      });

      return res.status(200).send({
          message: "Post modifiée"
      })
  } catch (err) {
      return res.status(500).json(err);
  }
}

exports.findOnePost= (req, res, next) => {

  models.posts.findOne({
    order:[[
        'createdAt', 'DESC'
   ]],
    include:{
        model:models.users,
    },
     where: { id: req.params.id }
    })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(500).json(error));
};
     
exports.getAllPosts = (req, res, next) => {
    models.posts.findAll({
        order:[[
             'createdAt', 'DESC'
        ]],
         include:{
             model:models.users,
         }}).then(posts => {
       return res.status(200).json(posts);
     }).catch(error => {
        return res.status(500).json({
            
         });
     });
    }


