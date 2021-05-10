const express = require('express')
const foods = express.Router()
const Food = require('../models/food.js')
const seed = require('../models/seed.js')

//index
foods.get('/', (req,res) => {
  Food.find({}, (error, foundFoods) => {
    res.json(foundFoods)
  })
})

//create Route
foods.post('/', (req,res) => {
  Food.create(req.body, (error, createdFood) => {
    Food.find({}, (error, foundFoods) => {
      res.json(foundFoods)
    })
  })
})

//seed route:
foods.get('/seed', (req,res) => {
  Food.insertMany(seed, (error, manyFoods) => {
    res.redirect('/foods')
  })
})

//edit and update page:
foods.put('/:id', (req,res) => {
  Food.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (error, updatedFood) => {
      if (error) {
        res.send(error)
      } else {
        Food.find({}, (error, foundFoods) => {
          res.json(foundFoods)
        })
      }
    }
  )
})

//delete:
foods.delete('/:id', (req,res) => {
  Food.findByIdAndRemove(req.params.id, (error, deletedFood) => {
    Food.find({}, (error, foundFoods) => {
      res.json(foundFoods)
    })
  })
})
module.exports = foods
