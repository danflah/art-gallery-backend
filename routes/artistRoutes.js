const router = require('express').Router();
const { 
    getArtists,
    addArtist
} = require('../controller/artistController');

router.get('/artists', getArtists);
router.post('/artist', addArtist);

module.exports = router;