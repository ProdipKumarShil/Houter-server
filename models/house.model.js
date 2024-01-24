const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  name: String,
  address: Number,
  bathroom: Number,
  bedroom: Number,
  city: String,
  date: Date,
  description: String,
  img: Array,
  number: Number,
  roomSize: Number
})

module.exports = mongoose.model('House', houseSchema)