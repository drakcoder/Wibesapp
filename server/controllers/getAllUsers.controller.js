const { getAllUsers } = require('../db/db');

const getUsers = async (req, res, next) => {
    const users = await getAllUsers();
    console.log(users);
    return res.send({ users });
};

module.exports = {
    getUsers
};