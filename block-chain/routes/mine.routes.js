const express = require('express');
const { mine } = require('../controllers/mine.controller');

const router = express.Router();

router.post('/mine', mine);

module.exports = router;