const express = require('express');
const mongoose = require('mongoose');
const blockChainWorks = require('./routes/block-chain.routes');
const verificationWorks = require('./routes/mine.routes');
const agenda = require('agenda');
const cors = require('cors');
const axios = require('axios');

const link = 'mongodb+srv://drakcoder991:kamala12345@cluster0.b0dsp.mongodb.net/?retryWrites=true&w=majority';


const deletion = new agenda.Agenda({
    db: { address: link, collection: 'blockCallCollection' },
    processEvery: '30 seconds',
    useUnifiedTopology: true
});

deletion.define('delete post', async (job) => {
    const blockChain = await blockChainModel.find({ mined: true, deleted: false });
    for (let block of blockChain) {
        const total = block.likes + block.dislikes + block.ignores;
        if (total < 5) {
            continue;
        }
        if ((block.dislikes / total) >= 0.6) {
            const link = `http://localhost:8000/delete/${block.postId}`;
            console.log(link);
            await axios.delete(link);
            block.deleted = true;
            block.save();
        }
    }
    console.log("check complete");
});

mongoose.connect(link, (err, client) => {
    if (err) {
        console.log(err);
    }
    console.log('connected to block-chain db');
});


const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:8000' }));

app.use('/', blockChainWorks);
app.use('/', verificationWorks);

app.listen(8080, async () => {
    console.log("app listening to 8080");

});

(async function () {
    const del = deletion.create('delete post', {});
    await deletion.start();
    await del.repeatEvery('10 seconds').save();
})();

