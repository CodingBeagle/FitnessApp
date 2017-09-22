var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var workout = mongoose.model('Workouts');
var activity = mongoose.model('Activities');

module.exports.createWorkoutActivity = function(req, res)
{
    var userid = req.params.userid;
    var workoutid = req.params.workoutid;

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
    
                    foundUser.save(function(err, updatedUser) {
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
                                    "updatedUser": updatedUser
                                });
                        }
                    });
                }
            }
        })
    }
}

module.exports.deleteWorkoutActivity = function(req, res)
{
    var userid = req.params.userid;
    var workoutid = req.params.workoutid;
    var activityid = req.params.activityid;

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
    
                    foundUser.save(function(err, updatedUser) {
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
                                    "updatedUser": updatedUser
                                });
                        }
                    });
                }
            }
        })
    }
}