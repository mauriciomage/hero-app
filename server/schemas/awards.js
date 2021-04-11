const mongoose = require('mongoose')
const User =  require('../schemas/users').schema;
const AwardsSchema = new mongoose.Schema({
    user: User,
    name: String,
    description: String,
    created_at: String
})

const Awards = mongoose.model('Award', AwardsSchema)

module.exports = Awards