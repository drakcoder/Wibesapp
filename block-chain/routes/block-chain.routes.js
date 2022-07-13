const express = require('express');
const { add_block } = require('../controllers/add_block.controller');

const router = express.Router();

router.post('/add-block', add_block);

module.exports = router;
