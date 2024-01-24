const express = require('express');
const router = express.Router()
const User = require('../models/user.model')

router.get('/users', (req, res) => {
  res.send({user: 'all users'})
})
router.post('/signUp', async(req, res) => {
  try {
    const userData = req.body
    const user = new User(userData)
    await user.save()
    res.status(201).send({ status: true, message: 'User created successfully!' })
  } catch (error) {
    res.status(500).send({status: false, message: error.message})
  }
})

module.exports = router