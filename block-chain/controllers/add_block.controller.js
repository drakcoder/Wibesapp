const { blockChainModel } = require("../models/block-chain.model");
const shortid = require('shortid');

const add_block = async (req, res, next) => {
    console.log("inside add_block");
    const body = req.body;
    let block_chain = await blockChainModel.find().sort({ date: 1 });
    let prevHash = block_chain.length ? block_chain[block_chain.length - 1].currHash : null;
    const final = new blockChainModel({
        postId: body.postId,
        nonce: null,
        mined: false,
        prevHash: prevHash,
        date: new Date(),
        blockId: shortid(),
        currHash: null,
        response: body.response,
        userUid: body.userUid,
        likes: body.likes,
        dislikes: body.dislikes,
        ignores: body.ignores,
        minedDate: null,
        deleted: false
    });
    await final.save();
    res.send({ 'saved': true });
};

module.exports = {
    add_block
};