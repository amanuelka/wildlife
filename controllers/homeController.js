const { hasUser } = require('../middlewares/guards');
const { getAll, getOwn } = require('../services/postService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home');
});

homeController.get('/posts', async (req, res) => {
    const posts = await getAll();
    res.render('all-posts', { posts });
});

homeController.get('/profile', hasUser(), async (req, res) => {
    const posts = await getOwn(req.user._id);
    res.render('my-posts', { posts });
});

module.exports = homeController;