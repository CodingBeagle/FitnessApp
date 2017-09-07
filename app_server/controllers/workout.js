var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Exercise = mongoose.model('Exercises')
var WorkoutProgram = mongoose.model('Workouts');
<<<<<<< HEAD
=======


>>>>>>> 8a6bfc3033dd7cec446a27eb844d1c1fb5537eb4

module.exports.CreateUser = function(username, callback)
{
	var newUser = new Users ({username: username});
	Users.create(newUser, callback);
};

module.exports.GetUser = function(username, callback)
{
	Users.findOne({username : username}, callback);
};

module.exports.GetUsersWorkout = function(username, callback)
{

}

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

module.exports.CreateWorkout = function(user, workoutName, callback)
{
	Users.findOne({username : user.username}, function(err, dbUser)
	{
		if (dbUser == null || err)
		{
			console.log("Failed to find user with username: " + dbUser.username);
			callback(err);
		}

		var newProgram = new WorkoutProgram ( {workoutName : workoutName} );
		dbUser.workoutprograms.push(newProgram);
		dbUser.save(callback);
	})
};