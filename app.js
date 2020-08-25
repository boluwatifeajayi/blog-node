const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');
const hbs = require('hbs');

mongoose.connect(config.database,{ useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

const port = process.env.PORT || 4000;

//check connection
db.once('open', function(){
    console.log('Connected to mongo db');
});

//check for db errors
db.on('error', function(err){
    console.log(err);
});

//init app
const app = express();

//bring in models
let Article = require('./models/article');

//load view engine
hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "ejs");

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
//parse application json
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});


//passport config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});



//home route
app.get('/', function(req, res){
    Article.find({}, function(err, articles, article){
        if(err){
            console.log(err);
        }else{
            res.render('index', {
                title: "innovate",
                description: "Short description of the article",
                articles: articles
                
            });
        }
        
    }).sort({postDate: 'desc'});
    
});
app.get('/', function (req, res) {
    Article.find({}, function (err, articles, article) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: "innovate",
                articles: articles

            });
        }

    });

});

//about route
app.get('/about', function (req, res) {
   res.render('about');
});

//route files

let articles = require('./routes/articles');
let users = require('./routes/users');
app.use('/articles', articles);
app.use('/users', users);


//start server
app.listen(port, function(){
    console.log(`Server runing on port ${port}`);
});