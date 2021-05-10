const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  image: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_NcNnBofKvhUNV-A8gE6BNI3nJFLDxwEbQA&usqp=CAU"
  },
  notes: String
})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food
