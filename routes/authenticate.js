const express = require('express');
const app = express.Router();
const chatkit = require('../chatkit');

app.post('/', (req, res) => {
    const authData = chatkit.authenticate({
        userId: req.query.user_id,
    });
    res.status(authData.status).send(authData.body);
});

module.exports = app;
