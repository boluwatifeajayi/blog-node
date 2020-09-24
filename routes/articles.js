const express = require('express');
const router = express.Router();
//article model
let Article = require('../models/article');
//user model
let User = require('../models/user');



// add article route
router.get('/add', ensureAuthenticated, function (req, res) {
    res.render("add_article", {
        title: "Add Article",
    });
});
//load edit form
router.get("/edit/:id", ensureAuthenticated, function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        if (article.author != req.user._id) {
            req.flash('danger', 'Not Authorized');
            return res.redirect('/allposts');
        }
        res.render("edit_article", {
            title: 'Edit Article',
            article: article
        });
    });
});


// add submit POST Route
router.post('/add', function (req, res) {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.user._id;
    article.description = req.body.description;
    article.createdAt = req.body.createdAt;
    article.body = req.body.body;
    article.category = req.body.category;
    article.image = req.body.image;
    article.writer = req.body.writer;
    article.postDate = req.body.postDate;
    article.nextTitleOne = req.body.nextTitleOne;
    article.nextLinkOne = req.body.nextLinkOne;
    article.nextTitleTwo = req.body.nextTitleTwo;
    article.nextLinkTwo = req.body.nextLinkTwo;
    article.nextTitleThree = req.body.nextTitleThree;
    article.nextLinkThree = req.body.nextLinkThree;

    req.flash('success', 'Article Added')
    article.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/allposts');
        }
    });

})

//update submit post

router.post("/edit/:id", function (req, res) {
    let article = {};
    article.title = req.body.title;
    article.author = req.user._id;
    article.description = req.body.description;
    article.createdAt = req.body.createdAt;
    article.body = req.body.body;
    article.category = req.body.category;
    article.image = req.body.image;
    article.writer = req.body.writer;
    article.postDate = req.body.postDate;
    article.nextTitleOne = req.body.nextTitleOne;
    article.nextLinkOne = req.body.nextLinkOne;
    article.nextTitleTwo = req.body.nextTitleTwo;
    article.nextLinkTwo = req.body.nextLinkTwo;
    article.nextTitleThree = req.body.nextTitleThree;
    article.nextLinkThree = req.body.nextLinkThree;

    let query = {
        _id: req.params.id
    }

    Article.update(query, article, function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            req.flash('success', 'Article updated');
            res.redirect("/allposts");
        }
    });
});

//delete article

router.delete('/:id', function (req, res) {

    if (!req.user._id) {
        res.status(500).send();
    }

    let query = {
        _id: req.params.id
    }


    Article.findById(req.params.id, function (err, article) {
        if (article.author != req.user._id) {
            res.status(500).send();
        } else {
            Article.remove(query, function (err) {
                if (err) {
                    console.log(err);
                }
                res.send('Success');
            });
        }
    })

});
//get single article
router.get('/:id', function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        if(err){
            res.render('error');
            console.log("there was an error")
        }else{
            User.findById(article.author, function (err, user) {
                if (err) {
                    res.render("error")
                    console.log("there was an error");
                } else {
                    res.render("article", {
                        article: article,
                        author: user.name,
                        
                    });
                }

            });
        }
        

    });
});

//access control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}

module.exports = router;