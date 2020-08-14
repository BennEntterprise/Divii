const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        requried: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    passwordSalt: {
        type: String,
        default: ''
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User