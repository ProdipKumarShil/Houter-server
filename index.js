const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// routes
const userRoute = require('./routes/user')

mongoose.connect('mongodb://localhost:27017/houseDB')
  .then(() => console.log("DB connected"))
  .catch(e => console.log(e.message))

app.get('/', (req, res) => {
  res.send('Houter Server is running')
})

// api routes
app.use('/user', userRoute)
  
app.listen(PORT, () => {
  console.log("Houter is running on", PORT)
})
