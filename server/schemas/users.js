const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    phone: String,
    city: String,
    profile: String,
    created_at: String
})

const User = mongoose.model('User', UserSchema)

module.exports = User