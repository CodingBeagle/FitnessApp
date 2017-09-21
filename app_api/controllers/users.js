var mongoose = require('mongoose');
var Users = mongoose.model('Users');

module.exports.createUser = function(req, res) {
    if (req.body)
    {
        var newUser = new Users({username: req.body.username, workoutprograms: req.body.workoutprograms});
        Users.create(newUser, function(err, user)
        {
            if (err)
            {
                res.status(500);
                res.json(
                    {
                        "message": "User failed to be created on database!"
                    }
                );
            }

            res.status(200);
            res.json(
                {
                    "message": "User was created successfully on database! :D",
                    "userId" : user._id
                }
            );
        });
    }
    else
    {
        res.status(400);
        res.json(
            {
                "Error" : "Missing username parameter."
            }
        );
    }
};

module.exports.getUser = function(req, res) {
    Users.findOne({username : req.params.username}, function(err, user)
    {
        if(user){
            res.status(200);
            res.json({
                    "message": "Request to GetUser was a success! :D",
                    "User" : user
                });
        }
        else{
            res.status(404);
            res.json({
                    "Message" : "Failed to get user",
                    "Error" : err
                });
        }
    });
}

module.exports.deleteUser = function(req, res) {
    Users.find({_id : req.params.userid}).remove().exec(function(err, updatedUser){
        if(err){
            res.status(500);
            res.json({
                "Message" : "An error has occurred - Deletion failed",
                "Error" : err
            });
        }
        else{
            res.status(200);
            res.json({
                    "Message" : "Deletion completed",
                    "Affected rows" : updatedUser
                });
        }
    });
};