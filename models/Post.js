const { Schema, model, Types } = require('mongoose');

// TODO add user properties and validation according to assignment
const postSchema = new Schema({
    // •	Title - string (required),
    // •	Keyword - string (required),
    // •	Location - string (required),
    // •	Date of creation - string (required),
    // •	Image - string (required),
    // •	Description - string (required),
    // •	Author - object Id (a reference to the User model),
    // •	Votes on post - a collection of Users (a reference to the User model),
    // •	Rating of post - number, default value 0
    
});

postSchema.index({ email: 1, }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Post = model('User', postSchema);
module.exports = Post;