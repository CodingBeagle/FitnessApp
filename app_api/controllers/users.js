var mongoose = require('mongoose');
var Users = mongoose.model('Users');

module.exports.createUser = function(req, res) {
    if (!req.body.username || !req.body.password)
    {
        res.status(400);
        res.json(
            {
                "message" : "All fields required"
            }
        );
        return;
    }
    var newUser = new Users({username: req.body.username });
    newUser.setPassword(req.body.password);
    Users.create(newUser, function(err, user)
    {
        var token;
        if (err)
        {
            res.status(500);
            res.json(
                {
                    "message": "User failed to be created on database!"
                }
            );
        }else{
            token = user.generateJwt();
            res.status(200);
            res.json(
                {
                    "message": "User was created successfully on database",
                    "token" : token
                }
            );
        }
    });
};

module.exports.login = function(req, res){
    if(!req.body.username || !req.body.password){
        res.status(400)
        res.json({"message": "All fields required"});
    }
    else{
        Users.findOne({username : req.body.username}, function(err, user){
            if(user){
                if(user.validatePassword(req.body.password)){
                var token = user.generateJwt();
                res.status(200);
                res.json({
                        "message": "Request was a success",
                        "userid" : user._id,
                        "username" : user.username,
                        "workoutprograms" : user.workoutprograms,
                        "token" : token
                    });
                }
                else{
                    res.status(401);
                    res.json({
                            "message" : "wrong password",
                        });
                }
            }
            else{
                res.status(404);
                res.json({
                        "message": "User not found",
                        "error" : err
                    });
            }
        });
    }
}

module.exports.getUser = function(req, res) {
    if(req.payload.username == req.params.username){
        Users.findOne({username : req.payload.username}, function(err, user){
            if(user){
                res.status(200);
                res.json({
                        "message": "Request was a success",
                        "userid" : user._id,
                        "username" : user.username,
                        "workoutprograms" : user.workoutprograms
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
    else{
        res.status(401)
        res.json({"message" : "Unauthorized"});    
    }
}

module.exports.deleteUser = function(req, res) {
    if(req.payload._id == req.params.userid){
        Users.find({_id : req.payload._id}).remove().exec(function(err, updatedUser){
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
    }
};