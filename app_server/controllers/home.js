var workout = require('./workout.js');

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

		req.session.user = user;
		res.render('workout', {user : user});
	});
};

module.exports.Workout = function(req, res)
{
	res.render('workout', {user: req.session.user})
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
		req.session.user = user;
		res.render('workout', {user : user});
	});
};

module.exports.ShowExercises = function(req, res)
{
	var workoutName = req.body.workoutName;
	res.render('exercises', {user : req.session.user, workoutname : workoutName });
}

module.exports.CreateExercise = function(req, res)
{
	var exerciseData = {exercisename: req.body.exercisename, description: req.body.description, sets: req.body.sets, reps: req.body.reps};
	workout.CreateExercise(req.session.user, req.body.workoutname, exerciseData, function(err, updatedUser)
	{
		req.session.user = updatedUser;
		res.render('exercises', {user: req.session.user, workoutname: req.body.workoutname});
	});
}

module.exports.DeleteExercise = function(req, res)
{
	var workoutId = req.body.workoutid;
	var exerciseId = req.body.exerciseid;
	workout.DeleteExercise(req.session.user, workoutId, exerciseId, function(err, updatedUser)
	{
		if(updatedUser == null || err){
			res.render('error', err);
		}
		req.session.user = updatedUser;
		res.render('exercises', {user: updatedUser, workoutname: req.body.workoutName})
	});
}

module.exports.CreateWorkout = function(req, res)
{
	workout.CreateWorkout(req.session.user, req.body.workoutname, function(err,updatedUser)
	{
		if (err)
		{
			res.render('error', err);	
		}

		if (updatedUser != null)
		{
			req.session.user = updatedUser;	
		}

		res.render('workout', {user : req.session.user});
	});
};

module.exports.DeleteWorkout = function(req, res)
{
	var oId = req.body.workoutid;
	workout.DeleteWorkout(req.session.user.username, oId, function(err, updateResponse)
	{	
		if(err){
			console.log("Error cocured: " + err);
			res.render('error', err);
		}

		workout.GetUser(req.session.user.username, function(err, user)
		{
			if(user != null && !err){
				req.session.user = user;
				console.log("currentlySignedInUser " + req.session.user);
				res.render('workout', {user: req.session.user});
			}
			res.render('error', err)
		});
	});
}