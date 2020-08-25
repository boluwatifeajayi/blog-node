let mongoose = require('mongoose');

//Article Schema
let trendingSchema = mongoose.Schema({
    trendingTitle: {
        type: String,

    },
    trendingDescription: {
        type: String,
    },
    trendingLink: {
        type: String,
    }
    
});



let Comment = module.exports = mongoose.model('Trending', trendingSchema);