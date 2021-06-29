const db =require('../models/index');
const comment =require('../models/comment');

exports.deleteComment = (req, res, next) => {
    db.comment.findOne({ where: { id: req.params.id } })
        .then((comment) => {
            db.comment.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'commentaire supprimée' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.createComment = (req, res, next) => {
    const comment = {
        userId: req.userId,
        comment: req.body.comment
    };
    db.comment.create(comment)
        .then(() => res.status(201).json({ message: "commentaire crée!" }))
        .catch(error => res.status(400).json({ error }));
};