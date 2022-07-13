const { blockChainModel } = require('../models/block-chain.model');
const sha256 = require('sha256');

const mine = async (req, res, next) => {
    const body = req.body;
    const blockId = body.blockId;
    const block = await blockChainModel.findOne({ mined: false, blockId: blockId });
    if (!block) {
        return res.send({ 'msg': 'block already mined or not available' });
    }
    const prevBlock = await blockChainModel.findOne({ mined: true }).sort({ minedDate: -1 }).limit(1);
    console.log(prevBlock);
    if (prevBlock) {
        block.prevHash = prevBlock.currHash;
    }
    console.log(block);
    for (let nonce = 0; nonce < Number.MAX_VALUE; nonce++) {
        // console.log((nonce.toString() + (block.prevHash ? block.prevHash : '') + block.blockId));
        let buf = Buffer.from((nonce.toString() + (block.prevHash ? block.prevHash : '') + block.blockId));
        let hashed = sha256(buf, { asBytes: true });
        let blockHash = sha256(buf);
        let value = 0;
        let target = Math.pow(2, 256 - 10);
        for (let v of hashed) {
            value = (value * 256) + v;
        }
        if (value <= target) {
            block.currHash = blockHash;
            block.nonce = nonce;
            block.minedDate = new Date();
            block.mined = true;
            console.log(block);
            block.save();
            return res.send({ nonce });
        }
        // console.log(hashed);
    }
};

module.exports = {
    mine,
};