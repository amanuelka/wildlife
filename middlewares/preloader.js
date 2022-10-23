const { getById } = require('../services/postService');

function preload() {
    return async function (req, res, next) {
        res.locals.post = await getById(req.params.id);
        next();
    };
}

module.exports = preload;