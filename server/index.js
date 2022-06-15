const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user.route');
const getAllUsersRoute = require('./routes/getAllUsers.route');

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

app.use('/', userRoute);
app.use('/', getAllUsersRoute);

app.listen(8000, () => {
    console.log('listening to port 8000');
});