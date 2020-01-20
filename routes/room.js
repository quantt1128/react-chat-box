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

app.post('/detail', (req, res) => {
    const {roomId} = req.body;
    chatkit.getRoom({
        roomId: roomId,
    })
        .then(room => {
            res.status(200).json({
                status: 200,
                message: 'get room successfully!',
                room: room
            })
        })
        .catch(err => {
            res.status(err.status).json({
                status: err.status,
                message: err.error_description
            });
        });
});
/*
 * get user by
 */
app.post('/list', (req, res) => {
    const {userId} = req.body;
    console.log(userId);
    chatkit.getUser({
        id: userId
    }).then((user) => {
        chatkit.getUserRooms({
            userId: user.id
        })
            .then((rooms) => {
                res.status(200).json({
                    status: 200,
                    message: 'success',
                    rooms: rooms
                });
            }).catch((err) => {
            console.log(err);
            res.status(err.status).json({
                status: err.status,
                message: err.error_description
            });
        })
    }).catch((err) => {
        res.status(err.status).json({
            status: err.status,
            message: err.error_description
        });
    });

});

module.exports = app;