const mongoose = require('mongoose')
const User =  require('../schemas/users').schema;
const Award =  require('../schemas/awards').schema;
const UsersAwardsSchema = new mongoose.Schema({
    user: User,
    award: Award,
    created_at: String
})

const UsersAwards = mongoose.model('UsersAwards', UsersAwardsSchema)

module.exports = UsersAwards