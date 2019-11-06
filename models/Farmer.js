const mongoose = require('mongoose')
const {Schema} = mongoose

const FarmerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    region: {
        type:String,
        required: true
    },
    contacts: {
        type: String
    },
    imprest: [{ 
        date: Date,
        amount: Number,
        item: String
    }],
    transaction: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'transaction'
    }],
    paySlip: [
        {
            date: Date,
            imprest: Number,
            sales: Number,
            total: Number
        }
    ],
    advance: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'advance'
        }
    ]
})

module.exports = mongoose.model('farmer',FarmerSchema)