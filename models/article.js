let mongoose = require('mongoose');
let slugify = require('slugify')

//Article Schema
let articleSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    writer: {
        type: String
    },
    postDate: {
        type: String
    },
    body:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
    },
    postNumber: {
        type: Number,
        default: 999999
    },
    nextTitleOne: {
        type: String,
    },
    nextLinkOne: {
        type: String
    },
    nextTitleTwo: {
        type: String,
    },
    nextLinkTwo: {
        type: String
    },
    nextTitleThree: {
        type: String,
    },
    nextLinkThree: {
        type: String
    }

    
});



let Article = module.exports = mongoose.model('Article', articleSchema);