const router = require('express').Router()
const mongoose = require('mongoose');
const House = require('../models/house.model')

router.post('/addHouse', async(req, res) => {
  try {
    const house = new House(req.body)
    await house.save()
    res.status(201).send({status: true, message: "House added successfully"})
  } catch (error) {
    res.status(500).send({status: false, message: "Failed to added house!"})
  }
})

module.exports = router