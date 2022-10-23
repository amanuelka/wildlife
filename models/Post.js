const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const postSchema = new Schema({
    title: { type: String, required: true, minlength: [6, 'Title should be at least 6 characters long'] },
    keyword: { type: String, required: true, minlength: [6, 'Keyword should be at least 6 characters long'] },
    location: { type: String, required: true, maxlength: [15, 'Location cannot be more than 15 characters long'] },
    date: {
        type: String,
        required: true,
        match: [/^[0-9\.\-\/]{10}$/, 'Date should be exactly 10 characters long']
    },
    image: {
        type: String,
        required: true,
        match: [URL_PATTERN, 'Image should start with http:// or https://']
    },
    description: { type: String, required: true, maxlength: [8, 'Description cannot be more than 8 characters long'] },
    author: { type: Types.ObjectId, ref: 'User' },
    votes: { type: [Types.ObjectId], ref: 'User' },
    rating: { type: Number, default: 0 }
});

const Post = model('Post', postSchema);
module.exports = Post;