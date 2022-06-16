const neo4j = require('neo4j-driver');
require('dotenv').config();
const bcrypt = require('bcrypt');

const uri = 'neo4j+s://88e3638e.databases.neo4j.io';
const user = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

const createUser = async (name, email, password) => {
    const query = `MERGE (u:User { name:"${name}",email:"${email}",password:"${password}"})`;
    console.log(query);
    const writeResult = await session.writeTransaction(tx => {
        tx.run(query);
    });
    return;
};

const findUser = async (email, password) => {
    const query = `MATCH (u:User) WHERE u.email="${email}" RETURN u`;
    console.log(query);
    const result = await session.run(query);
    const hash = result.records[0]._fields[0].properties.password;
    const check = await bcrypt.compare(password, hash);
    if (check) {
        return {
            status: check,
            user: result.records[0]._fields[0].properties
        };
    }
    return {
        status: check
    };
};

const getAllUsers = async () => {
    const query = `MATCH (u:User) RETURN u`;
    console.log(query);
    const result = await session.run(query);
    let ids = [];
    for (r of result.records) {
        ids.push(r._fields[0]);
    }
    return ids;
    // return result.records[0]._fields;
};

const getAllPosts = async () => {
    const query = `MATCH (p:Post) RETURN p`;
    console.log(query);
    const result = await session.run(query);
    let posts = [];
    for (r of result.records) {
        posts.push(r._fields[0]);
    }
    return posts;
};

const _createPost = async (email, title, description) => {
    const query = `MATCH (u:User) WHERE u.email="${email}" MERGE (p:Post {title:"${title}",description:"${description}"}) MERGE (u)-[:POSTED]->(p)`;
    console.log(query);
    try {
        await session.run(query);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};

module.exports = {
    createUser,
    findUser,
    getAllUsers,
    getAllPosts,
    _createPost
};
