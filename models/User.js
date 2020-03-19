const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    img:String
})

module.exports = mongoose.model('User', userSchema)