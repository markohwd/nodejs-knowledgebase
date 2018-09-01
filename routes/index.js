var express = require('express');
var router = express.Router();

// Bring in Models
let Articles = require('../models/article');

/* GET home page. */
router.get('/articles', function(req, res, next) {

	Articles.find({}, function(err, articles){

		if(err){
			console.log(err);
		}else{
			res.render('articles', {
		  		title: 'Articles',
		  		articles: articles
			});
		}
	});

});

// Get Single Article
router.get('/article/:id', function(req, res, next) {

	Articles.findById(req.params.id, function(err, article){
		console.log(article);

			res.render('get_article', {
		  		article: article
			});
	});
});


// Edit Single Article
router.get('/article/edit/:id', function(req, res, next) {

	Articles.findById(req.params.id, function(err, article){
		console.log(article);

			res.render('edit_article', {
		  		article: article
			});
	});
});


// Update Article
router.post('/articles/edit/:id', function(req, res, next) {

	let article = {};
	article.title = req.body.title;
	article.author = req.body.author;
	article.body = req.body.body;

	let query = {_id:req.params.id}

	Articles.update(query, article, function(err){
		if(err)
		{
				console.log("**** Error ****")
				console.log(err)
				return;

		} else {
				req.flash('success', 'Article Updated');
				res.redirect('/');
		}
	});


});


router.delete('/article/:id', function(req, res, next) {
	let query = {_id:req.params.id}

	Articles.remove(query, function(err){
		if(err){
			console.log(err);
		}
		res.send('Success');
	});

});


/* GET home page. */
router.get('/', function(req, res, next) {

	/*
	Articles.find({}, function(err, articles){

		if(err){
			console.log(err);
		}else{
			res.render('index', {
		  	title: 'Articles',
		  	//articles: articles
			});
		}
	});
	*/

	let articles = [

		{
			id: 1,
			title: "Article 1",
			author: "Marko Rodic",
			body: "This is article 1"
		},
		{
			id: 2,
			title: "Article 2",
			author: "Marko Rodic",
			body: "This is article 2"
		},
		{
			id: 3,
			title: "Article 3",
			author: "Marko Rodic",
			body: "This is article 3"
		},

	];

	res.render('index', {
		  	title: 'Articles',
		  	articles: articles
			});

});

// Add Article Form
router.get('/articles/add', function(req, res, next) {

		res.render('add_article', {
		  	title: 'Add Article',
		});

});

// Submit Article
router.post('/articles/add', function(req, res, next) {

	req.checkBody('title', 'title is required').notEmpty();
	req.checkBody('author', 'author is required').notEmpty();
	req.checkBody('body', 'body is required').notEmpty();

	// Get errors
	let errors = req.validationErrors();

	if(errors){
		res.render('add_article', {
			title: 'Add Article',
			errors: errors
		});
	} else {

				console.log(req.body.title);

				let article = new Articles();
				article.title = req.body.title;
				article.author = req.body.author;
				article.body = req.body.body;

				article.save(function(err){
					if(err)
					{
							console.log("**** Error ****")
							console.log(err)
							return;

					} else {
						  req.flash('success', 'Article Added');
							res.redirect('/articles/add');
					}
				});

	}




});

module.exports = router;
