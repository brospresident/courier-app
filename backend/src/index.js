const express = require('express');
const mysql = require('./mysql');
const apiRouter = require('./api');
const cors = require('cors');

let app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

const PORT = 6001;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

    mysql.connectMysql((err, res) => {
        if (err) throw err;
    });
});