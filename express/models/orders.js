const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: mongoose.Schema.Types.Number,
          default: 1
        }
      }
    ],
    issuedDate: {
      type: mongoose.Schema.Types.Date,
      required: true
    },
    hours: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    status: {
      type: mongoose.Schema.Types.String,
      enum: ['ongoing', 'completed', 'cancelled'],
      default: 'pending'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

orderSchema.pre(/^find/, function (next) {
  this.populate('products.productId')
  next()
})

module.exports = mongoose.model('Order', orderSchema)
