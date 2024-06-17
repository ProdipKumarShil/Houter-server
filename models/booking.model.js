const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  house: Object,
  email: String,
  checkIn: Date,
  checkOut: Date,
  bed: Number,
  travellers: Number,
})

module.exports = mongoose.model('Booking', bookingSchema)