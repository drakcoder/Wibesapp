const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const { createUser, findUser, _createPost, _updatePost, deletePost } = require('../db/db');

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const status = await findUser(email, password);
    if (status.status) {
        const name = status.user.name;
        const email = status.user.email;
        const uid = status.user.uid;
        const user = {
            name,
            email,
            uid,
        };
        const token = await jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 });
        return res.status(200).send({ message: 'login success', success: true, token: token });
    }
    return res.status(200).send({ message: 'login fail', success: false });
};

const register = async (req, res, next) => {
    const body = req.body;
    const name = body.name;
    const email = body.email;
    const password = body.password;
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    await createUser(name, email, hash);
    const user = {
        name,
        email
    };
    const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 });
    return res.cookie('token', token, { httpOnly: true }).status(201).send({ success: true, token: token });
};

const createPost = async (req, res, next) => {
    const body = req.body;
    const token = body.token;
    try {
        var decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        console.log(error);
    }
    const email = decoded.email;
    const title = body.title;
    const description = body.description;
    const status = await _createPost(email, title, description);
    if (status.status) {
        return res.status(201).send({ status });
    }
    return res.status(502).send({ status });
};

const updatePost = async (req, res, next) => {
    const body = req.body;
};

const likeDislikePost = async (req, res, next) => {
    const body = req.body;
    const token = body.token;
    const post = body.uid;
    try {
        var decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        console.log(error);
    }
    const action = body.action;
    try {
        let status = await _updatePost(decoded, post, action);
        const updatedPost = status.post.properties;
        console.log('user: ', decoded);
        const block = {
            postId: updatedPost.uid,
            response: action,
            userUid: decoded.uid,
            likes: updatedPost.likes.low,
            dislikes: updatedPost.dislikes.low,
            ignores: updatedPost.ignores.low
        };
        const blockStatus = await axios.post('http://localhost:8080/add-block', block);
        console.log(blockStatus.data);
        return res.status(200).send({ status });
    } catch (error) {
        console.log(error);
        return res.status(401).send({ status: false });
    }
};

const _deletePost = async (req, res, next) => {
    const postId = req.params.id;
    await deletePost(postId);
    return res.status(202).send({});
};

module.exports = {
    login,
    register,
    createPost,
    updatePost,
    likeDislikePost,
    _deletePost
};