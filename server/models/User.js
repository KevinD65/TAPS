const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String },
    hash: { type: String},
    username: { type: String },
    bio: { type: String }
});

module.exports = mongoose.model('User', UserSchema);