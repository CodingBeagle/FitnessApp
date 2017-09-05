var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Exercise = mongoose.model('Exercises')



module.exports.CreateUser = function(username, callback)
{
	var newUser = new Users ({username: username});
	Users.create(newUser, callback);
};

module.exports.GetUser = function(username, callback)
{
	Users.findOne({username : username}, callback);
};

module.exports.UpdateWorkout = function(req,res)
{
		var newstuff = new Exercise ({name : 'WebStuff', description: 'great stuff', sets: 3, reps: 'so many'});

		var dingus = Users.findOne({username : 'Dingus'}, function(err, user)
		{
			user.exerciseprogram.push({exerciseprogram : newstuff});
			user.save(function(err)
				{
					console.log("Ding dong motherfucker");		
				});
		});
};

module.exports.CreateWorkout = function(name )
{

};