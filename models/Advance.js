const mongoose = require('mongoose')
const {Schema} = mongoose

const AdvanceSchema = new Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'farmer'
    },
    item: String,
    amount: {
        type: Number
    },
    settled: {
        type:Boolean,
        default: false
    },
    deadline: {
        type: Date
    }
},{timestamps:true})

module.exports = mongoose.model('advance',AdvanceSchema)