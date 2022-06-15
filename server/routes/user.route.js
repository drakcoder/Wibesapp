const express = require('express');
const { login, register, createPost } = require('../controllers/user.controller');


const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/createPost', createPost);

module.exports = router;