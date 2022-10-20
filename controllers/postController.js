const { parseError } = require('../util/parser');
const { hasUser, isOwner } = require('../middlewares/guards');
const { create, update, deleteById, vote } = require('../services/postService');
const { addPost } = require('../services/userService');
const preloader = require('../middlewares/preloader');

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
        const post = await create(data);
        await addPost(post._id, req.user._id);
        res.redirect('/posts');
    } catch (error) {
        res.render('create', { errors: parseError(error), ...data });
    }
});

postController.get('/:id', preloader(true), async (req, res) => {
    const post = res.locals.post;

    if (req.user) {
        post.isAuthor = post.author.toString() == req.user._id.toString();
        post.voted = post.votes.map(x => x.toString()).includes(req.user._id.toString());
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

postController.get('/:id/vote/:rate', preloader(), async (req, res) => {
    const post = res.locals.post;
    if (post.author.toString() != req.user._id.toString() &&
        post.votes.map(v => v.toString()).includes(req.user._id.toString()) == false) {
        await vote(post, req.user._id, req.params.rate);
    }
    res.redirect(`/post/${req.params.id}`);
});

module.exports = postController;