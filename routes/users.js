const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in Models
let User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



// Register Form
router.get('/register', function(req, res, next) {

		res.render('register', {
		  	title: 'Register',
		});

});

router.post('/register', function(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('name', 'name is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('username', 'username is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password2', 'password2 is required').equals(req.body.password);

	// Get errors
	let errors = req.validationErrors();

	if(errors){
		res.render('register', {
			errors: errors
		});
	} else {

        let newUser = new User({

          name:name,
          email:email,
          username:username,
          password:password

        });

        bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(newUser.password, salt, function(err, hash){ // run through ther hash, pass the salt and return callback
            if(err){
              console.log(err);
            }
            newUser.password = hash; // update user with crypted password
            newUser.save(function (){
              if(err){
                console.log(err);
                return;
              }else{
                // Show Message
                req.flash('success', 'You are now registered and can log in');
                res.redirect('user/login');
              }
            })
          });

        });

  }

});

// Login Form
router.get('/login', function(req, res, next) {
		res.render('login');
});

// Login Process
router.post('/login', function(req, res, next) {
  passport.authenticate('local', 
    {
        successRedirect:'/',
        failureRedirect:'/users/login',
        failureFlash: true
    })(req, ers, next);
});

module.exports = router;
