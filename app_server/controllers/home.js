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

		console.log(user);
		res.render('workout', {user : user});
	});
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
			res.render('workout', {user : user});
		});
};