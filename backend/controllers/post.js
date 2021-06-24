
const fs = require('fs'); 
const db =require('../models/post')


exports.deletePost = (req, res, next) => {
    // nous utilisons l'ID que nous recevons comme paramètre pour accéder au post correspondant dans la base de données 
            db.Post.findOne 
            ({ where: { id: req.params.id }})
              .then(post => {
    //nous utilisons le fait de savoir que notre URL d'image contient un segment /images/ pour séparer le nom de fichier ;
                const filename = sauce.imageUrl.split('/images/')[1];
    // nous utilisons ensuite la fonction unlink du package fs pour supprimer ce fichier, en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé ;
                fs.unlink(`images/${filename}`, () => {
                  post.deleteOne({post_id: req.params.id })
                    .then(() => res.status(200).json({ message: 'post supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
                });
              })
              .catch(error => res.status(500).json({ error }));
};

exports.createPost = (req, res, next) => {
if (!req.file) {
    db.post.create({
        ...req.body,
        UserId: userId,
        imageUrl: "",
    })
        .then((post) => res.status(201).json({post}))
        .catch((error) => res.status(500).json(error));

    } else if (req.file) {
        db.post.create({
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
