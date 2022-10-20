const { getAll } = require('../services/postService');
const { getPopulatedUser } = require('../services/userService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home');
});

homeController.get('/posts', async (req, res) => {
    const posts = await getAll();
    res.render('all-posts', { posts });
});

homeController.get('/profile', async (req, res) => {
    const user = await getPopulatedUser(req.user._id);
    const posts = user.posts;
    res.render('my-posts', { posts });
});

module.exports = homeController;