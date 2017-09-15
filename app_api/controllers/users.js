var mongoose = require('mongoose');
var Users = mongoose.model('Users');

module.exports.createUser = function(req, res) {
    if (req.body)
    {
        var newUser = new Users({username: req.body.username});
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
                    "message": "User was created successfully on database! :D"
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
    res.status(200);
    res.json(
        {
            "message": "Request to GetUser was a success! :D"
        }
    );
};

module.exports.deleteUser = function(req, res) {
    res.status(200);
    res.json(
        {
            "message": "Request to DeleteUser was a success! :D"
        }
    );
};