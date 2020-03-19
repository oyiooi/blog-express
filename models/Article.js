const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true,'no title']
    },
    author: {
        type: String,
        required: [true,'no author']
    },
    classification: {
        type: String,
        required: [true, 'no classification']
    },
    editorState: {
        type: String,
        required: [true, 'no body']
    },
    date: {
        type: Date,
        default: Date.now()
    },
    keywords: {
        type: Array,
        required: [true, 'no keyword']
    },
    like: Number
});

module.exports = mongoose.model('Article', articleSchema);