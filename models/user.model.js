const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: Number,
  role: String,
})

module.exports = mongoose.model('User', userSchema)