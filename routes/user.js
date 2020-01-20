const express = require('express');
const app = express.Router();
const chatkit = require('../chatkit');

/*
 * User Router
 */
app.post('/', (req, res) => {

    if (!req.body.name) {
        req.body.name = req.body.userId;
    }
    const { userId, name } = req.body;
    chatkit.getUser({
        id: userId
    }).then((user) => {
        res.status(200).json({
            status: 200,
            message: 'success',
            user: user
        })
    }).catch(err => {
        if (err.status === 404) {
            // create new user
            chatkit
                .createUser({
                    id: userId,
                    name: name
                })
                .then((user) => {
                    res.status(200).json({
                        status: 200,
                        message: 'success',
                        user: user
                    });
                })
                .catch(err => {
                    res.status(err.status).json({
                        status: err.status,
                        message: err.message,
                        error: 'create fail'
                    });
                });
        } else {
            res.status(err.status).json({
                status: err.status,
                message: err.message,
                error: 'get fail'
            });
        }
    });

});

app.post('/detail', (req, res) => {
    chatkit.getUser({
        id: req.body.userId,
    })
        .then(user => {
            res.status(200).json({
                status: 200,
                message: 'get user success',
                user: user
            })
        })
        .catch(err => {
            res.status(err.status).json({
                status: err.status,
                message: err
            })
        });
});


app.post('/send-message', (req, response) => {
    const {userId, roomId, text} = req.body;
    chatkit.sendSimpleMessage({
        userId: userId,
        roomId: roomId,
        text: text,
    })
        .then(res => {
            console.log(res);
            response.status(200).json({
                status: 200,
                message: 'success',
                messageId: res.message_id
            });
        })
        .catch(err => {
            console.log(err);
            response.status(err.status).json({
                status: err.status,
                message: err.error_description
            })
        })
});

module.exports = app;