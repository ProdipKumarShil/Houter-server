const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: Number,
  role: String,
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id}, process.env.PRIVATE_KYE, {expiresIn: "7d"})
  return token
}

module.exports = mongoose.model('User', userSchema)

// const User = mongoose.model("user", userSchema)
