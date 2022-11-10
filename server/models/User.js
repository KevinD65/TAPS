const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String},
    username: { type: String },
    email: {type: String},
    hash: { type: String},
    bio: { type: String },
    pwResetHash: {type: String},
});

module.exports = mongoose.model('User', UserSchema);