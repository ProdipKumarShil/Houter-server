const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
// const router = require("express").Router()
const User = require('../models/user.model')

router.get('/users', (req, res) => {
  res.send({ user: 'all users' })
})

router.post('/signUp', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    
    if (user) {
      return res.status(409).send({ status: false, message: "Email already exist" })
    }

    const salt = await bcrypt.genSalt(Number(process.env.SATL))
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    await new User({ ...req.body, password: hashPassword }).save()

    res.status(201).send({ status: true, message: 'User created successfully!' })
    
  } catch (error) {
    res.status(500).send({ status: false, message: error.message })
  }
})

router.post('/signIn', async(req, res) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if(!user){
      return res.status(401).send({status: false, message: "User not found"})
    }
    const validPassword = await bcrypt.compare(
      req.body.password, user.password
    )
    if(!validPassword){
      return res.status(401).send({status: false, message: "Invalid password"})
    }
    const token = user.generateAuthToken()
    res.status(200).send({token: token, user, message: "Logged in successfully"})

  } catch (error) {
    res.status(500).send({message: error})
  }
})

module.exports = router