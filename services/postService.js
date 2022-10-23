const Post = require('../models/Post');

async function create(post) {
    return Post.create(post);
};

async function getAll() {
    return Post.find({}).lean();
};

async function getOwn(userId) {
    return Post.find({ author: userId }).populate('author', 'firstName lastName').lean();
};

async function getById(id) {
    return Post.findById(id).lean();
}; 

async function getByIdPopulated(id) {
    return Post.findById(id).populate('author', 'firstName lastName').populate('votes', 'email').lean();
}; 

async function update(id, data) {
    const updatedPost = await Post.findById(id);
    Object.assign(updatedPost, data);
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

module.exports = { create, getAll, getOwn, getById, getByIdPopulated, update, deleteById, vote };