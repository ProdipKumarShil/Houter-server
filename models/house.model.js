const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  name: String,
})

module.exports = mongoose.model('House', houseSchema)