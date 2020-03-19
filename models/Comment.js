const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name: String,
    content: String,
    date: Date,
    belong: {type: Schema.Types.ObjectId, ref: 'Article'}
})

module.exports = mongoose.model('Comment', commentSchema)