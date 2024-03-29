const router = require('express').Router()
const House = require('../models/house.model')
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// configuration
const storage = multer.memoryStorage();
const upload = multer({storage: storage})
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

router.post('/addHouse', upload.array('images'), async(req, res) => {
  try{
    const imagePromises = req.files.map((file) => 
    new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({resource_type: 'auto', folder: 'houter'}, (error, result) => {
        if(error) {
          reject(error)
        } else {
          resolve(result.secure_url)
        }
      }).end(file.buffer)
    })
    )
    const imageUrls = await Promise.all(imagePromises);
    const newHouse = new House({
      ...JSON.parse(req.body.houseData),
      images: [...(req.body.images || []), ...imageUrls],
    })

    await newHouse.save()
    res.status(201).json({status: true, message: 'House added successfully'})
  } catch (error) {
    res.status(500).json({status: false, message: 'Failed to add house with images'})
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

router.get('/houseByEmail/:email', async(req, res) => {
  try {
    const email = req.params.email
    const eHouse = await House.find({'user.email': email})
    if(eHouse.length == 0){
      res.status(404).send({status: false, message: "House or email not found!"})
    } else {
      res.status(201).send(eHouse)
    }
    
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.delete('/deleteHouse/:id', async(req, res) => {
  try {
    const id = req.params.id
    const deleteHouse = await House.findByIdAndDelete(id)
    if(deleteHouse){
      res.status(201).send({status: true, message: 'House deleted successfully'})
    } else {
      res.status(500).send({status: false, message: 'Failed to delete house'})
    }
  } catch (error) {
    res.status(500).send({status: false, message: 'Something went wrong'})
  }
})

module.exports = router