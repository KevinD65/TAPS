const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String },
    password: { type: String},
    username: { type: String },
    id: { type: Number },
    bio: { type: String }
});

module.exports = mongoose.model('User', UserSchema);