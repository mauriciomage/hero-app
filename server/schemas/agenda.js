const mongoose = require('mongoose')
const User =  require('../schemas/users').schema;
const Stadium =  require('../schemas/stadiums').schema;
const AgendaSchema = new mongoose.Schema({
    user: User,
    stadium: Stadium,
    hour: String,
    day: String,
    status: String,
    price: Number,
    created_at: String
})

const Agenda = mongoose.model('Agenda', AgendaSchema)

module.exports = Agenda