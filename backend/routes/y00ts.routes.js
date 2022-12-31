const express = require('express');
const {getAllY00ts, getTraitPrices, getY00tsFP, getT00bsFP} = require('../controllers/y00ts.controller');


const router = express.Router();


router.get('/getY00ts', getAllY00ts);
router.get('/getTraitPrices', getTraitPrices);
router.get('/getY00tsFP', getY00tsFP);
router.get('/getT00bsFP', getT00bsFP);

module.exports = router;