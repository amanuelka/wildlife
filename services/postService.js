const Post = require('../models/Post');
const User = require('../models/User');

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
    return Post.findById(id);
};

async function update(post, data) {
    const updatedPost = Object.assign(post, data);
    return updatedPost.save();
};

async function deleteById(id) {
    return Post.findByIdAndDelete(id);
};

async function vote(post, userId, rate) {
    post.votes.push(userId);
    if (rate == 'up') {
        post.rating++;
    } else if (rate == 'down') {
        post.rating--;
    }
    return post.save();
}

module.exports = {
    create,
    getAll,
    getById,
    getByIdNoLean,
    update,
    deleteById,
    vote
};