const express = require('express');
const router = express.Router();
const goalsCtrl = require('../controllers/goalsStackController');

router.post('/', goalsCtrl.getGoals);

module.exports = router;