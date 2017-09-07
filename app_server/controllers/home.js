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

		currentlySignedInUser = user;
		res.render('workout', {user : user});
	});
};

module.exports.Workout = function(req, res)
{
	res.render('workout', {user: currentlySignedInUser})
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
	res.render('exercises', {user : req.body.user, workoutname : workoutName });
}

module.exports.CreateExercise = function(req, res)
{

}

module.exports.CreateWorkout = function(req, res)
{
	workout.CreateWorkout(currentlySignedInUser, req.body.workoutname, function(err,updatedUser)
	{
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

module.exports.DeleteWorkout = function(req, res)
{
	var oId = req.body.workoutid;
	workout.DeleteWorkout(currentlySignedInUser.username, oId, function(err, updateResponse)
	{	
		if(err){
			console.log("Error cocured: " + err);
			res.render('error', err);
		}

		workout.GetUser(currentlySignedInUser.username, function(err, user)
		{
			if(user != null && !err){
				currentlySignedInUser = user;
				console.log("currentlySignedInUser " + currentlySignedInUser);
				res.render('workout', {user: currentlySignedInUser});
			}
			res.render('error', err)
		});
	});
}