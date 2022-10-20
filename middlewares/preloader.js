const { getById, getByIdNoLean } = require('../services/postService');

module.exports = (lean) => async (req, res, next) => {
    res.locals.post = lean
        ? await getById(req.params.id)
        : await getByIdNoLean(req.params.id);
    next();
}