const { getById, getByIdPopulated } = require('../services/postService');

module.exports = (lean) => async (req, res, next) => {
    res.locals.post = lean
        ? await getById(req.params.id)
        : await getByIdPopulated(req.params.id);
    next();
}