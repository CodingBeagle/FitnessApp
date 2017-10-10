var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
var Users = mongoose.model('Users');

passport.use(new LocalStrategy({usernameField : 'username'},
	function(username, password, done){
		Users.findOne({username : username}, function(err, user){
			if(err) {return done(err);}
			if(!user){return done(null, false, {message : 'Incorrect username'});}
			if(user.validPassword(password) == false){return done(null,false, {message : 'Incorrect password'});}

			return done(null, user);
		});
	}));