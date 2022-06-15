const express = require('express');
const { getUsers } = require('../controllers/getAllUsers.controller');

const router = express.Router();

router.get('/getAllUsers', getUsers);

module.exports = router;