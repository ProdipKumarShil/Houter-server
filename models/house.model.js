const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  name: String,
  price: Number,
  address: String,
  bathroom: String,
  bedroom: String,
  city: String,
  availableDate: Date,
  description: String,
  img: Array,
  number: Number,
  roomSize: Number,
  user: Object
})

module.exports = mongoose.model('House', houseSchema)