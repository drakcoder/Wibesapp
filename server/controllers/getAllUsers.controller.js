const { getAllUsers, getAllPosts } = require('../db/db');

const getUsers = async (req, res, next) => {
    const users = await getAllUsers();
    console.log(users);
    return res.send({ users });
};

const getPosts = async (req, res, next) => {
    const posts = await getAllPosts();
    console.log(posts);
    return res.send({ posts });
};


module.exports = {
    getUsers,
    getPosts
};