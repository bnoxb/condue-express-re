const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: String,
    stars: Number,
    note: String 
})

module.exports = mongoose.model('Review', reviewSchema);