const router = require('express').Router();
const { 
    getArts,
    addArt
} = require('../controller/artController');
const { __auth__ } = require('../middlewire/common');

router.get('/arts', getArts);
router.post('/art', addArt);

module.exports = router;