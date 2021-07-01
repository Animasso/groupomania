const fs = require('fs'); 
const models=require('../models/index.js')


exports.deletePost = (req, res, next) => {
    // nous utilisons l'ID que nous recevons comme paramètre pour accéder au post correspondant dans la base de données 
            models.Post.findOne 
            ({ where: { id: req.params.id }})
              .then(post => {
    //nous utilisons le fait de savoir que notre URL d'image contient un segment /images/ pour séparer le nom de fichier ;
                const filename = post.imageUrl.split('/images/')[1];
    // nous utilisons ensuite la fonction unlink du package fs pour supprimer ce fichier, en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé ;
                fs.unlink(`images/${filename}`, () => {
                  post.destroy({post_id: req.params.id })
                    .then(() => res.status(200).json({ message: 'post supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
                });
              })
              .catch(error => res.status(500).json({ error }));
};

exports.createPost = (req, res, next) => {
if (!req.file) {
    models.Post.create({
        ...req.body,
        UserId: userId,
        imageUrl: "",
    })
        .then((post) => res.status(201).json({post}))
        .catch((error) => res.status(500).json(error));

    } else if (req.file) {
        models.Post.create({
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
exports.modifyPost = async (req, res) => {

  try {
      await models.Post.findOne({
          where: {
              id: (req.params.id)
          }
      });
      await models.Post.update({
          content: req.body.content,
          image: req.body.image
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

  models.Post.findOne({
          where: {
              id: req.params.id
          },
          include: {
              model: models.User,
              attributes: ['firstname','lastname']
          }
      })
      .then(post => {
          res.status(200).json(post);
      })
      .catch(error => res.status(400).json({
          error
      }));
};

exports.getAllPosts = (req, res, next) => {

  models.Post.findAll({
          include: {
              model: models.post,
              attributes: ['firstname','lastname']
          }
      })
      .then(posts => res.status(200).json(posts))
      .catch(error => res.status(400).json({
          error: error
      }));
};