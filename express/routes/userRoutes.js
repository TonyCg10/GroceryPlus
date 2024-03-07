const express = require('express')
const router = express.Router()

const User = require('../models/users')

router.get('/', async (req, res) => {
  try {
    const data = await User.find()

    res.json({ success: true, data: data, message: 'Users gotten' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

router.post('/users', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body
    const img = req.file ? req.file.path : null

    const newUser = new User({ name, email, password, phone, img })
    const savedUser = await newUser.save()

    res.status(201).json({ success: true, data: savedUser, message: 'User created' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/check-user', async (req, res) => {
  try {
    const { email, password, phone } = req.body

    let query = {}

    if (email) {
      query.email = email
    }

    if (password) {
      query.password = password
    }

    if (phone) {
      query.phone = phone
    }

    const user = await User.findOne(query)

    if (user) {
      res.status(200).json({ exists: true, user, message: 'Found' })
    } else {
      res.status(200).json({ exists: false, message: 'Not Found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/update/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const updateFields = req.body
    const newImage = req.file

    if (newImage) {
      updateFields.img = newImage.path
    }

    const result = await User.updateOne({ _id: userId }, { $set: updateFields })

    if (!result) {
      return res.status(404).json({ success: false, message: 'Document not found' })
    }

    res.status(200).json({ success: true, message: 'Updated', data: result })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

router.delete('/delete/:id', async (req, res) => {
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

module.exports = router
