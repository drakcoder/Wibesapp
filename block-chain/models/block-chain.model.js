const mongoose = require('mongoose');

blockChainSchema = mongoose.Schema({
    postId: String,
    nonce: Number,
    mined: Boolean,
    prevHash: String,
    date: Date,
    blockId: String,
    currHash: String,
    response: String,
    userUid: String,
    likes: Number,
    dislikes: Number,
    ignores: Number,
    minedDate: Date,
    deleted: Boolean
}, {
    collection: 'block-chain',
});

blockChainModel = mongoose.model('block-chain', blockChainSchema);

module.exports = {
    blockChainModel
};