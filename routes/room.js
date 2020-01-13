const express = require('express');
const app = express.Router();
const chatkit = require('../chatkit');

app.post('/create', (req, res) => {
    const {id, creatorId, name, customData} = req.body;
    const isPrivate = (req.body.isPrivate === '1');
    chatkit.createRoom({
        id: id,
        creatorId: creatorId,
        name: name,
        isPrivate: isPrivate,
        customData: customData
    })
        .then(room => {
            console.log('Room created successfully');
            res.status(200).json({
                status: 200,
                message: 'room created successfully!',
                room: room
            });
        }).catch((err) => {
            res.status(err.status).json({
                status: err.status,
                message: err.error_description
            });
        });
});


module.exports = app;