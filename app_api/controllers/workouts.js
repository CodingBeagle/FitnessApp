var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var workout = mongoose.model('Workouts');

module.exports.createWorkout = function(req, res) {
    if (req.body)
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
                                "User": user
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
    console.log("Calling delete workouts");

    var userId = req.params.userid;
    var workoutId = req.params.workoutid;

    console.log("User to delete workout from: " + userId);
    console.log("Workout to delete: " + workoutId);

    Users.update({_id: userId}, { $pull: {workoutprograms : {_id : workoutId}}}, function(err, numAffected)
    {
        console.log(err);
        if (err)
        {
            console.log("HERKA");
            res.status(500);
            res.json(
                {
                    "message": "Failed to remove workout from user"
                }
            );
        } else if (numAffected.nModified == 0)
        {
            console.log("DERKA");
            res.status(409);
            res.json(
                {
                    "message": "No workouts were removed"
                }
            );
        } else
        {
            Users.findOne({_id : userId}, function(err, dbUser)
            {
                console.log("POOPSHIZZLE");
                if (dbUser == null || err)
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
                        "User": dbUser
                    }
                );
            })
        }
    });
};