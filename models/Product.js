const mongoose = require('mongoose')
const {Schema} = mongoose

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    overpay: {
        type: Number, 
        required: true
    }
})

module.exports = mongoose.model('product',ProductSchema)