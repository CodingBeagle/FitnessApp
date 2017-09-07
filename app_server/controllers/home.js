var workout = require('./workout.js');

var currentlySignedInUser = null;

module.exports.index = function(req,res)
{
    res.render('index', {title: "FitnessApp"});
};

module.exports.SignIn = function(req, res)
{
	res.render('signin');
};

module.exports.Login = function(req,res)
{
	workout.GetUser(req.body.username, function(err, user)
	{
		if(err){
			res.render('error', err);
		}

		if (user == null){
			res.render('signin', {LoginErrorMessage : 'User does not exist'})
		}

		console.log(user);
		currentlySignedInUser = user;
		res.render('workout', {user : currentlySignedInUser});
	});
};

module.exports.Workout = function(req, res)
{

};

module.exports.CreateUser = function(req,res)
{
	var username = req.body.username;
	workout.CreateUser(username, function(err, user){
			if(err){
				console.log('An error has occured: ' + err);
				res.render('error', err);
			}
			
			console.log('User added: ' + user );
			currentlySignedInUser = user;
			res.render('workout', {user : user});
		});
};

module.exports.ShowExercises = function(req, res)
{
	var workoutName = req.body.workoutName;
	console.log("The fucking name man: " + workoutName);

	/*
	workout.GetWorkout(currentlySignedInUser, workoutName, function(theWorkerOuter)
	{
		console.log("buuuuh!");
	})*/

	res.render('exercises', {user : currentlySignedInUser, workoutname : workoutName });
}

module.exports.CreateWorkout = function(req, res)
{
	theWorkoutName = req.body.workoutname;

	workout.CreateWorkout(currentlySignedInUser, theWorkoutName, function(err, updatedUser)
	{
		console.log("The updated USER");
		console.log(updatedUser);

		if (err)
		{
			res.render('error', err);	
		}

		if (updatedUser != null)
		{
			currentlySignedInUser = updatedUser;	
		}

		res.render('workout', {user : currentlySignedInUser});
	});
};