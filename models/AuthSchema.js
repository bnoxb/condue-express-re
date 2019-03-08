const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: String   
});

module.exports = mongoose.model('User', authSchema);