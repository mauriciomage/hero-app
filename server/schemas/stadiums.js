const mongoose = require('mongoose')

const StadiumSchema = new mongoose.Schema({
    name: String,
    city: String,
    sport: String,
    created_at: String
})

const Stadium = mongoose.model('Stadium', StadiumSchema)

module.exports = Stadium