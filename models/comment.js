let mongoose = require('mongoose');

//Article Schema
let commentSchema = mongoose.Schema({
    name: {
        type: String,
        
    },
    email: {
        type: String,
    },
    body: {
        type: String
    }
});



let Comment = module.exports = mongoose.model('Comment', commentSchema);