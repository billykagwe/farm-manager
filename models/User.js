const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    }
})

module.exports = mongoose.model('user',UserSchema)