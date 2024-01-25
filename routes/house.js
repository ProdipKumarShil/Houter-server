const router = require('express').Router()
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

router.get('/allHouse', async(req, res) => {
  try {
    const house = await House.find()
    res.status(200).send(house)
  } catch (error) {
    res.status(500).send({status: false, message: error.message})
  }
})

router.get('/house/:id', async(req, res) => {
  try{
    const id = req.params.id
    const house = await House.findById(id)
    res.status(200).send(house)
  } catch (e) {
    res.status(500).send({status: false, message: error.message})
  }
})

module.exports = router