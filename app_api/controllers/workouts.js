var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var workout = mongoose.model('Workouts');

module.exports.createWorkout = function(req, res) {
    if (req.body.workoutName && req.payload._id == req.params.userid)
    {
        var userId = req.params.userid;

        Users.findOne({_id : userId}, function(err, dbUser)
        {
            if (dbUser == null || err)
            {
                console.log("Failed to find user with id: " + userId);
                res.status(404);
                res.json(
                    {
                        "message": "Failed to find user with id: " + userId + " on database."
                    }
                );
            } else
            {
                var newWorkout = new workout ( {workoutName : req.body.workoutName } );

                dbUser.workoutprograms.push(newWorkout);
                dbUser.save(function (err, user)
                {
                    if (err) {
                        res.status(500);
                        res.json(
                            {
                                "message": "Failed to update user with new workout"
                            }
                        );
                    } else
                    {
                        res.status(200);
                        res.json(
                            {
                                "message": "Workout was created on the database!",
                                "userid" : user._id,
                                "username" : user.username,
                                "workoutprograms" : user.workoutprograms
                            }
                        );
                    }
                });
            }
        })
    }
    else
    {
        res.status(400);
        res.json(
            {
                "Error" : "Missing workout name parameter."
            }
        );
    }
};

module.exports.deleteWorkout = function(req, res) {
    var userId = req.params.userid;
    var workoutId = req.params.workoutid;
    if(req.payload._id == req.params.userid){
        Users.update({_id: userId}, { $pull: {workoutprograms : {_id : workoutId}}}, function(err, numAffected)
        {
            console.log(err);
            if (err)
            {
                res.status(500);
                res.json(
                    {
                        "message": "Failed to remove workout from user"
                    }
                );
            } else if (numAffected.nModified == 0)
            {
                res.status(409);
                res.json(
                    {
                        "message": "No workouts were removed"
                    }
                );
            } else{
                Users.findOne({_id : userId}, function(err, user)
                {
                    if (user == null || err)
                    {
                        console.log("Failed to find user with id: " + userId);
                        res.status(404);
                        res.json(
                            {
                                "message": "Failed to find user with id: " + userId + " on database."
                            }
                        );
                    };
        
                    res.status(200);
                    res.json(
                        {
                            "Message": "Deleted workout from user",
                            "userid" : user._id,
                            "username" : user.username,
                            "workoutprograms" : user.workoutprograms
                        }
                    );
                })
            }
        });        
    }
    
};