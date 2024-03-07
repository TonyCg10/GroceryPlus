const express = require('express')
const router = express.Router()

const Order = require('../models/orders')

router.get('/', async (req, res) => {
  try {
    const data = await Order.find()

    res.json({ success: true, data: data, message: 'Orders gotten' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    const orders = await Order.find({ userId })

    res.json({ success: true, data: orders, message: 'Orders found' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

router.post('/orders', async (req, res) => {
  try {
    const { userId, products, issuedDate, hours, status } = req.body

    const newOrder = new Order({ userId, products, issuedDate, hours, status })
    const savedOrder = await newOrder.save()

    res.status(201).json({ success: true, data: savedOrder, message: 'Order created' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/update/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json(order)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json({ message: 'Order deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/deleteProduct/:orderId/:productId', async (req, res) => {
  try {
    const orderId = req.params.orderId
    const productId = req.params.productId

    const order = await Order.findById(orderId)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    const productIndex = order.products
      .map((p) => p.productId)
      .findIndex((product) => product._id.toString() === productId)

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in the order' })
    }

    order.products.splice(productIndex, 1)

    await order.save()

    if (order.products.length === 0) {
      await Order.findByIdAndDelete(orderId)
      return res.json({ message: 'Order deleted because it has no more products' })
    }

    res.json({ message: 'Product deleted from the order' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
