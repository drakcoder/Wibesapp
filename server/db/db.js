const neo4j = require('neo4j-driver');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const uri = 'neo4j+s://88e3638e.databases.neo4j.io';
const user = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

const createUser = async (name, email, password) => {
    const uid = uuidv4();
    const query = `MERGE (u:User { uid:"${uid}",name:"${name}",email:"${email}",password:"${password}"})`;
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

const getAllPosts = async (user) => {
    const query = `MATCH (u:User) WHERE u.email="${user.email}" MATCH (p:Post) WHERE NOT (p)<-[:RESPONDED]-(u) RETURN p`;
    console.log(query);
    const result = await session.run(query);
    let posts = [];
    for (r of result.records) {
        posts.push(r._fields[0]);
    }
    return posts;
};

const _createPost = async (email, title, description) => {
    const uid = uuidv4();
    const query = `MATCH (u:User) WHERE u.email="${email}" MERGE (p:Post {uid:"${uid}",title:"${title}",description:"${description}",likes : 0 ,ignores : 0 ,dislikes : 0}) MERGE (u)-[:POSTED]->(p)`;
    console.log(query);
    try {
        await session.run(query);
        return { status: true, postId: uid };
    }
    catch (err) {
        console.log(err);
        return false;
    }
};

const _updatePost = async (user, post, action) => {
    let query;
    if (action == 'like') {
        query = `MATCH (u:User) WHERE u.email="${user.email}" MATCH (p:Post) WHERE p.uid="${post}" SET p.likes=p.likes+1 MERGE (u)-[:RESPONDED]->(p) RETURN p`;
    }
    if (action == 'dislike') {
        query = `MATCH (u:User) WHERE u.email="${user.email}" MATCH (p:Post) WHERE p.uid="${post}" SET p.dislikes=p.dislikes+1 MERGE (u)-[:RESPONDED]->(p) RETURN p`;
    }
    console.log(query);
    try {
        let updatedPost = await session.run(query);
        return { success: true, post: updatedPost.records[0]._fields[0] };
    } catch (error) {
        console.log(error);
        return false;
    }
};

const deletePost = async (uid) => {
    let query = `MATCH (p:Post) WHERE p.uid="${uid}" DETACH DELETE p`;
    try {
        await session.run(query);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

module.exports = {
    createUser,
    findUser,
    getAllUsers,
    getAllPosts,
    _createPost,
    _updatePost,
    deletePost
};
