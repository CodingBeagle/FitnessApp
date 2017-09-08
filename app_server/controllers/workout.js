var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Exercise = mongoose.model('Exercises');
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

module.exports.DeleteWorkout = function(username, id, callback)
{
	Users.update({username: username}, { $pull: {workoutprograms : {_id : id}}}, callback);
}

module.exports.CreateExercise = function(user, workoutname, exerciseData, callback)
{
	Users.findOne({username: user.username}, function(err, dbUser)
	{
		if(dbUser == null || err){
			console.log("Failed to find user with username: " + dbUser.username);
			callback(err);
		}

		if(dbUser.workoutprograms){
			dbUser.workoutprograms.forEach(function(program)
			{
				if(program.workoutName == workoutname){
					var newExercise = new Exercise(
						{
							exerciseName: exerciseData.exercisename, 
							description: exerciseData.description, 
							sets: exerciseData.sets, 
							reps: exerciseData.reps
						});
					program.exercises.push(newExercise);
					dbUser.save(callback);
				}
			});
		}
	});
}

