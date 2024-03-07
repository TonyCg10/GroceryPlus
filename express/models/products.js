const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    brand: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    description: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    discountPercentage: {
      type: mongoose.Schema.Types.Number
    },
    images: {
      type: [mongoose.Schema.Types.String],
      required: true
    },
    price: {
      type: mongoose.Schema.Types.Number,
      required: true
    },
    rating: {
      type: mongoose.Schema.Types.Number,
      required: true
    },
    stock: {
      type: mongoose.Schema.Types.Number,
      required: true
    },
    thumbnail: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    title: {
      type: mongoose.Schema.Types.String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('Product', productSchema)
