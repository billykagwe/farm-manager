const mongoose = require('mongoose')
const {Schema} = mongoose

const TransactionSchema = new Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'farmer'
    },
    product:String,
    rate: Number,
    total: Number,
    weight: Number
},{timestamps: true})

module.exports = mongoose.model('transaction',TransactionSchema)