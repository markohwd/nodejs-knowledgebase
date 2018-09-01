const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){

  //Inplement Local Strategy
  passport.use(LocalStrategy(function(username, password, done){
    // Match username
    let query = {username:username};
    
    // Find One User pass in query (user is the object)
    User.findOne(query, function(err, user){
      
      if(err) throw err; // If there is an error
      
      if(!user){
        return done(null, false, {message: 'No User Found'});
      }

      // Match Password
      bycrypt.compare(password, user.password, function(err, ismatch){

        if(err) throw err;
        if(ismatch){
          return done(null, user);
        }else{
          return done(null, false, {message: 'Wrong Password'});
        }
      });
    });
  }));

  // Serialize / Deserialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

}
