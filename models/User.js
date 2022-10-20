const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, 'First name should be at least 3 characters long'],
        match: [/^[A-Za-z]+$/i, 'First name should contain only Latin letters']
    },
    lastName: {
        type: String,
        required: true,
        minlength: [5, 'Last name should be at least 5 characters long'],
        match: [/^[A-Za-z]+$/i, 'Last name should contain only Latin letters']
    },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    posts: { type: [Types.ObjectId], ref: 'Post' }
});

userSchema.index({ email: 1, }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);
module.exports = User;