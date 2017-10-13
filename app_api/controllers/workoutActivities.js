var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var workout = mongoose.model('Workouts');
var activity = mongoose.model('Activities');

module.exports.createWorkoutActivity = function(req, res)
{
    var userid = req.params.userid;
    var workoutid = req.params.workoutid;
    if(req.payload._id == req.params.userid){
        if (userid == null || workoutid == null)
        {
            res.status(400);
            res.json(
                {
                    "message": "You have to specify userId and workoutId."
                });
        } else
        {
            Users.findById(userid, function(err, foundUser)
            {
                if (err)
                {
                    res.status(500);
                    res.json(
                        {
                            "message": "An error occoured attempting to find the related user."
                        });
                } else if (foundUser == null)
                {
                    res.status(404);
                    res.json(
                        {
                            "message": "The specified user was not found."
                        });
                } else
                {
                    var specifiedWorkout = foundUser.workoutprograms.id(workoutid);
        
                    if (specifiedWorkout == null)
                    {
                        res.status(404);
                        res.json(
                            {
                                "message": "The specified workout was not found."
                            });
                    } else
                    {
                        var currentTime = new Date();
        
                        var newActivity = new activity(
                            {
                                timestamp: currentTime.toString(),
                                description: "Completed workout!"
                            });
        
                        specifiedWorkout.activities.push(newActivity);
        
                        foundUser.save(function(err, user) {
                            if (err)
                            {
                                res.status(500);
                                res.json(
                                    {
                                        "message": "Failed to save the activity to workout program"
                                    });
                            } else
                            {
                                res.status(200);
                                res.json(
                                    {
                                        "message": "Successfully added activity log to workout!",
                                        "userid" : user._id,
                                        "username" : user.username,
                                        "workoutprograms" : user.workoutprograms,
                                    });
                            }
                        });
                    }
                }
            })
        }
    }
    else{
    res.status(401);
    res.json({"message":"unauthorized"});
    }
}

module.exports.deleteWorkoutActivity = function(req, res)
{
    var userid = req.params.userid;
    var workoutid = req.params.workoutid;
    var activityid = req.params.activityid;
    if(req.payload._id == req.params.userid){
        if (userid == null || workoutid == null || activityid == null)
        {
            res.status(400);
            res.json(
                {
                    "message": "You have to specify userId, workoutId and activityId."
                });
        } else
        {
            Users.findById(userid, function(err, foundUser)
            {
                if (err)
                {
                    res.status(500);
                    res.json(
                        {
                            "message": "An error occoured attempting to find the related user."
                        });
                } else if (foundUser == null)
                {
                    res.status(404);
                    res.json(
                        {
                            "message": "The specified user was not found."
                        });
                } else
                {
                    var specifiedWorkout = foundUser.workoutprograms.id(workoutid);
        
                    if (specifiedWorkout == null)
                    {
                        res.status(404);
                        res.json(
                            {
                                "message": "The specified workout was not found."
                            });
                    } else
                    {
                        specifiedWorkout.activities.pull({_id: activityid});
        
                        foundUser.save(function(err, user) {
                            if (err)
                            {
                                res.status(500);
                                res.json(
                                    {
                                        "message": "Failed to delete the activity from workout program"
                                    });
                            } else
                            {
                                res.status(200);
                                res.json(
                                    {
                                        "message": "Successfully deleted activity log from workout!",
                                        "userid" : user._id,
                                        "username" : user.username,
                                        "workoutprograms" : user.workoutprograms,
                                    });
                            }
                        });
                    }
                }
            })
        }
    }
    else{
        res.status(401);
        res.json({"message":"unauthorized"});
    }
}

module.exports.getAllWorkouts = function(req, res) {
    var workouts = [];

    Users.find({}, function(err, users) {
        if (err) {
            res.status(500);
            res.json(
                {
                    "message": "An error occoured attempting to retrieve users."
                });           
        }

        users.forEach(function(user) {
            workouts = workouts.concat(user.workoutprograms);
        });

        res.status(200);
        res.json(
            workouts
        );
    });
}