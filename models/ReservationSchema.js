const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    numGuests: {type: Number, required: true},
    note: String
})

module.exports = mongoose.model('Reservation', reservationSchema);