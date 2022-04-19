const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_ID: String,
    username: String,
    manager_name: String,
    role: String,
    photos: [],
});

userSchema.set('collection', 'users');

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;