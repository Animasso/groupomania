//package pour gérer les fichiers entrants dans les requêtes HTTP. 
const multer = require('multer');
// constante pour les extentions
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
//la fonction destination indique à multer d'enregistrer les fichiers dans le dossier images
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
//la fonction filename indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');