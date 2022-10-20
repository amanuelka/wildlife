const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

homeController.get('/posts', (req, res) => {
    res.render('all-posts', { user: req.user });
});

module.exports = homeController;