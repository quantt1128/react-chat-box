const ChatkitServer = require('@pusher/chatkit-server');

const chatkit = new ChatkitServer.default({
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
    key: process.env.CHATKIT_SECRET_KEY,
});



module.exports = chatkit;