const express = require("express");
const mongoose = require('mongoose')

const app = express();
require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

//middleware:
app.use(express.json())
app.use(express.static('public'))

//controllers:
const foodControllers = require('./controllers/food_controller.js')
app.use('/foods', foodControllers)

app.listen(PORT, () => {
  console.log("🍙 Listening on port " + PORT);
});

app.get('/', (req, res) => {
  res.redirect('/foods')
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

// Error / success
mongoose.connection.on('error', err =>
  console.log(
    err.message,
    ' is Mongod not running?/Problem with Atlas Connection?'
  )
)
mongoose.connection.on('connected', () =>
  console.log('mongo connected: ', MONGODB_URI)
)
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))
