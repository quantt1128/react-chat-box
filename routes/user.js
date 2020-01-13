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


app.post('/send-message', (req, res) => {
    chatkit.sendSimpleMessage({
        userId: 'novitase',
        roomId: 'mon-hoc-1',
        text: 'hello!',
    })
        .then(res => {
            res.status(res.status).json({
                status: res.status,
                message: 'success',
                messageId: res.messageId
            })
        })
        .catch(err => {
            res.status(err.status).json({
                status: err.status,
                message: err.message
            })
        })
});

module.exports = app;