const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose')
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
const apirouter = require('./router/api');
app.use(express.json());



app.use('/api', apirouter);
app.listen(process.env.port, () => {
    console.log(`server run ${process.env.port}`);
});
