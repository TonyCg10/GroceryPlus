const express = require('express')
const cors = require('cors')
const app = express()

const userRoutes = require('./routes/userRoutes')
const productsRoutes = require('./routes/productRoutes')
const orderRoute = require('./routes/orderRoutes')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const mongoose = require('mongoose')

mongoose
  .connect('mongodb+srv://antoniocorcoba1:4P8Lts5WkpxqNSuK@cluster0.iwirqeh.mongodb.net/Users')
  .then(() => {
    console.log('Connected')
    app.listen(2020, 'localhost', () => {
      console.log(`Server running on http://localhost:2020/`)
    })
  })
  .catch((err) => console.error(err))

app.use('/groceryplus/user', userRoutes)
app.use('/groceryplus/products', productsRoutes)
app.use('/groceryplus/orders', orderRoute)
