const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 2020


mongoose
  .connect('mongodb+srv://antoniocorcoba1:4P8Lts5WkpxqNSuK@cluster0.iwirqeh.mongodb.net/Users')
  .then(() => {
    console.log('Connected')
    app.listen(PORT, 'localhost', () => {
      console.log(`Server running on http://localhost:${PORT}/`)
    })
  })
  .catch((err) => console.error(err))

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: String,
    img: String,
    productId: [Number]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const User = mongoose.model('User', userSchema)

app.get('/', async (req, res) => {
  try {
    const data = await User.find({})

    res.json({ success: true, data: data, message: 'Gotten' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post('/users', async (req, res) => {
  try {
    const { name, email, password, phone, img, productId } = req.body
    const newUser = new User({ name, email, password, phone, img, productId })
    const savedUser = await newUser.save()

    res.status(201).json(savedUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/check-user', async (req, res) => {
  try {
    const { email, password, phone } = req.body
    let query = { email, password }

    if (phone) {
      query.phone = phone
    }

    const user = await User.findOne(query)

    if (user) {
      res.status(200).json({ exists: true, user })
    } else {
      res.status(404).json({ exists: false, message: 'Not Found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/update/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const updateFields = req.body

    const result = await User.updateOne({ _id: userId }, { $set: updateFields })

    if (!result) {
      return res.status(404).json({ success: false, message: 'Document not found' })
    }

    res.status(200).json({ success: true, message: 'Updated', data: result })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    const result = await User.deleteOne({ _id: id })

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Document not found' })
    }

    res.status(200).json({ success: true, message: 'Deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})
