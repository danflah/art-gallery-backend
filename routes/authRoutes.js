const router = require('express').Router();
const { 
    getUsers,
    signin, 
    register,
    getFavoruites,
    addToFavoruite,
    removeFromFavoruite

} = require('../controller/authController');
const { uploadImage } = require('../controller/uploadController')
const upload = require('../utils/multer');
const { __auth__ } = require('../middlewire/common');

router.get('/users', getUsers);
router.post('/signin', signin);
router.get('/favoruites',__auth__, getFavoruites);
router.post('/favoruite/:artId',__auth__, addToFavoruite);
router.delete('/favoruite',__auth__, removeFromFavoruite);

router.post('/register', register);
router.post('/upload',upload.single("image"), uploadImage);

module.exports = router;
