const Post = require('../models/Post');

async function create(post) {
    return Post.create(post);
};

async function getAll() {
    return Post.find({}).lean();
};

async function getById(id) {
    return Post.findById(id).lean();
};

async function getByIdNoLean(id) {
    return Post.findById(id).populate('author', 'firstName lastName').populate('votes', 'email');
};

async function update(post, data) {
    const updatedPost = Object.assign(post, data);
    return updatedPost.save();
};

async function deleteById(id) {
    return Post.findByIdAndDelete(id);
};

async function vote(postId, userId, rate) {
    const post = await Post.findById(postId);
    post.votes.push(userId);
    post.rating += rate;
    return post.save();
};

async function getOwn(userId) {
    return Post.find({ author: userId }).populate('author', 'firstName lastName');
}

module.exports = {
    create,
    getAll,
    getById,
    getByIdNoLean,
    update,
    deleteById,
    vote,
    getOwn
};