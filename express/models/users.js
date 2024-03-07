const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    phone: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    img: {
      type: mongoose.Schema.Types.String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('User', userSchema)
