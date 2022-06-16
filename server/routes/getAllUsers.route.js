const express = require('express');
const { getUsers, getPosts } = require('../controllers/getAllUsers.controller');

const router = express.Router();

router.get('/getAllUsers', getUsers);
router.get('/getAllPosts', getPosts);

module.exports = router;