const express = require('express');
const handlers = require('./handlers/handlers');

const apiRouter = express.Router();

apiRouter.post('/api', (req, res, next) => {
    let obj = req.body.method.split('.');
    let object = obj[0];
    let method = obj[1];

    if (!object || !method) {
        res.json({ id : req.body.id, error:{ message: "Not JSON-RPC"}, result: null });
		return;
    }

    if (handlers[object] && handlers[object][method]) {
        handlers[object][method](req, res, next);
    }
});

module.exports = apiRouter;