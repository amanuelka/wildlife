const { parseError, postViewModel } = require('../middlewares/parser');
const { hasUser, isOwner } = require('../middlewares/guards');
const preloader = require('../middlewares/preloader');
const { create, update, deleteById, vote, getByIdPopulated } = require('../services/postService');

const postController = require('express').Router();

postController.get('/create', hasUser(), (req, res) => {
    res.render('create');
});

postController.post('/create', hasUser(), async (req, res) => {
    const data = { ...req.body, author: req.user._id };
    try {
        if (Object.values(data).some(v => !v)) {
            throw new Error('All fields are required');
        }
        await create(data);
        res.redirect('/posts');
    } catch (error) {
        res.render('create', { errors: parseError(error), ...data });
    }
});

postController.get('/:id', async (req, res) => {
    const post = postViewModel(await getByIdPopulated(req.params.id));

    if (req.user) {
        post.isAuthor = post.author._id == req.user._id;
        post.voted = post.votes.find(v => v._id == req.user._id) != undefined;
    }

    res.render('details', { ...post });
});

postController.get('/:id/edit', hasUser(), preloader(true), isOwner(), async (req, res) => {
    const post = res.locals.post;
    res.render('edit', { ...post });
});

postController.post('/:id/edit', hasUser(), preloader(), isOwner(), async (req, res) => {
    const post = res.locals.post;

    try {
        await update(post, req.body);
        res.redirect(`/post/${req.params.id}`);
    } catch (error) {
        res.render('edit', { errors: parseError(error), ...req.body });
    }
});

postController.get('/:id/delete', hasUser(), preloader(), isOwner(), async (req, res) => {
    await deleteById(req.params.id);
    res.redirect('/posts');
});

postController.get('/:id/vote/:rate', hasUser(), async (req, res) => {
    const rate = req.params.rate == 'up' ? 1 : -1;
    const post = postViewModel(await getByIdPopulated(req.params.id));

    if (post.author._id != req.user._id && post.votes.find(v => v._id == req.user._id) == undefined) {
        await vote(req.params.id, req.user._id, rate);
    }
    res.redirect(`/post/${req.params.id}`);
});


module.exports = postController;