var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var workout = mongoose.model('Workouts');

module.exports.createWorkout = function(req, res) {
    if (req.body)
    {
        var userId = req.body.userId;

        Users.findOne({_id : userId}, function(err, dbUser)
        {
            if (dbUser == null || err)
            {
                console.log("Failed to find user with id: " + userId);
                res.status(500);
                res.json(
                    {
                        "message": "Failed to find user with id: " + userId + " on database."
                    }
                );
            }
    
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
                }

                res.status(200);
                res.json(
                    {
                        "message": "Workout was created on the database!"
                    }
                );
            });
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
    if (req.body)
    {
        
    }
    else
    {
        res.status(400);
        res.json(

        );
    }
};