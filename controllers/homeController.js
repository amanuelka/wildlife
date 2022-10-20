const { getAll } = require('../services/postService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home');
});

homeController.get('/posts', async (req, res) => {
    const posts = await getAll();
    res.render('all-posts', { posts });
});

homeController.get('/404', (req, res) => {
    res.render('404');
});

module.exports = homeController;