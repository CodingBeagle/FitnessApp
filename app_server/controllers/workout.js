var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Exercise = mongoose.model('Exercises')
var WorkoutProgram = mongoose.model('Workouts');

module.exports.CreateUser = function(username, callback)
{
	var newUser = new Users ({username: username});
	Users.create(newUser, callback);
};

module.exports.GetUser = function(username, callback)
{
	Users.findOne({username : username}, callback);
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

module.exports.CreateExercise = function(user, workoutname, callback)
{
	user.workoutprograms.findOne({workoutname: workoutname}, function(err, dasd)
	{
		console.log("---------------------------------------------- LOOK HERE DUDUM-------------");
		console.log(err);
	});
}

/*UNUSED */
module.exports.GetWorkout = function(user, workoutname, callback)
{
	Users.findOne({'workoutprograms': {$elemMatch: {workoutName: workoutname}}}, function (err, workout)
	{
	})
}

module.exports.DeleteWorkout = function(username, id, callback)
{
	Users.update({username: username}, { $pull: {workoutprograms : {_id : id}}}, callback);
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