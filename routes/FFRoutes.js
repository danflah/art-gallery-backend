const router = require('express').Router();
const { 
    getfunFacts,
    addFunfact
} = require('../controller/FFController');

router.get('/funfacts', getfunFacts);
router.post('/funfact', addFunfact);

module.exports = router;