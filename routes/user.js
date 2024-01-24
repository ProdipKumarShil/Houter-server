const express = require('express');
const router = express.Router()
const User = require('../models/user.model')

router.get('/users', (req, res) => {
  res.send({user: 'all users'})
})

module.exports = router