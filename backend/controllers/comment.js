const models =require('../models/index.js');


exports.deleteComment = (req, res, next) => {
    models.comments.findOne({ where: { id: req.params.id } })
        .then((comment) => {
            models.comments.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json(comment)
                ({ message: 'commentaire supprimée' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.createComment = (req, res, next) => {
    
    const comment = {
        userId: userId,
        postId: req.body.postId,
        comment: req.body.comment
    };
    models.comments.create(comment)
        .then(() => res.status(201).json({ message: "commentaire crée!" }))
        .catch(error => res.status(400).json({ error }));
};
exports.getAllComments = (req, res, next) => {
    models.comments.findAll({
        order:[[
            'createdAt', 'DESC'
       ]],
        include:{
            model:models.posts,
        },
         where: { postId: req.params.postId}
        })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(500).json(error))
};

