const { getByIdPopulated, getByIdLeaned } = require('../services/postService');

module.exports = (lean) => async (req, res, next) => {
    res.locals.post = lean
        ? await getByIdLeaned(req.params.id)
        : await getByIdPopulated(req.params.id);
    next();
};