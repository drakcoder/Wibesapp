const { getAllUsers, getAllPosts } = require('../db/db');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res, next) => {
    const users = await getAllUsers();
    console.log(users);
    return res.send({ users });
};

const getPosts = async (req, res, next) => {
    const token = req.headers.token;
    const result = await jwt.verify(token, process.env.TOKEN_SECRET);
    const posts = await getAllPosts(result);
    console.log(posts);
    return res.send({ posts });
};


module.exports = {
    getUsers,
    getPosts
};