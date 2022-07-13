const express = require('express');
const { login, register, createPost, likeDislikePost, _deletePost } = require('../controllers/user.controller');


const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/createPost', createPost);
router.patch('/updatePost', likeDislikePost);
router.delete('/delete/:id', _deletePost);

module.exports = router;