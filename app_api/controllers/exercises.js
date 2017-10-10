var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var workout = mongoose.model('Workouts');
var Exercise = mongoose.model('Exercises');

module.exports.createExercise = function(req, res){
	if(req.body && req.payload._id == req.params.userid){
		userid = req.params.userid;
		Users.findOne({_id: req.params.userid}, function(err, dbUser)
		{
			if(dbUser == null || err){
				console.log("Failed to find user with id: " + userId);
                res.status(404);
                res.json(
		            {
		                "message": "Failed to find user with id: " + userId + " on database."
		            });
			}

			if(dbUser.workoutprograms){
				dbUser.workoutprograms.forEach(function(program)
				{
					if(program._id == req.params.workoutid){
						var newExercise = new Exercise(
							{
								exerciseName: req.body.exercisename, 
								description: req.body.description, 
								sets: req.body.sets, 
								reps: req.body.reps
							});
						program.exercises.push(newExercise);
						dbUser.save(function(err, user){
							if(err){
								res.status(500);
				                res.json(
						            {
						                "message": "Failed to save the exercise to the workout"
						            });
							} else
							{
								res.status(200);
								res.json({
									"message": "Exercise has been created",
									"userid" : user._id,
                        			"username" : user.username,
                        			"workoutprograms" : user.workoutprograms
								});
							}
						});
					}	
				});
			}
		});
	}
	else{
        res.status(400);
        res.json(
            {
                "Error" : "Missing Body."
            });
    }
}

module.exports.deleteExercise = function(req,res){
	if(req.payload._id == req.params.userid){
		userid = req.params.userid;
		exerciseid = req.params.exerciseid;
		workoutid = req.params.workoutid;
		Users.findOne({_id: userid}, function(err, dbUser)
		{
			if(err || dbUser == null)
			{
				console.log("Failed to find user with id: " + userId);
	            res.status(404);
	            res.json(
		            {
		                "message": "Failed to find user with id: " + userId + " on database."
		            });
			}
			if(dbUser.workoutprograms.id(workoutid)){
				dbUser.workoutprograms.id(workoutid).exercises.pull({_id : exerciseid});
				dbUser.save(function(err, user){
					if(err){
						res.status(500);
		                res.json(
				            {
				                "message": "Failed to delete exercise"
				            });
					}else{
					res.status(200);
					res.json({
						"message": "Exercise has been deleted",
						"userid" : user._id,
	                    "username" : user.username,
	                    "workoutprograms" : user.workoutprograms
						});
					}
				});
			}
		});
	}
	else{
		res.status(404);
		res.json({"message":"unauthorized"});
	}
}