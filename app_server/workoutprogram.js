var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var exerciseSchema = new mongoose.Schema(
{
	exerciseName : String,
	description: String,
	sets: Number,
	reps: String
});

var activitySchema = new mongoose.Schema(
{
	timestamp: String,
	description: String
});

var workoutSchema = new mongoose.Schema(
{
	workoutName: String,
	exercises : [exerciseSchema],
	activities : [activitySchema]
});

var userSchema = new mongoose.Schema(
{
	username : String,
	password : String,
	salt : String,
	workoutprograms : [workoutSchema]
});

userSchema.methods.setPassword = function(password)
{
	this.salt = crypto.randomBytes(24).toString('hex');
	this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 128, 'sha512').toString('hex');
}

userSchema.methods.validatePassword = function(password)
{
	const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 128, 'sha512').toString('hex');
	return this.password == hash;
}

userSchema.methods.generateJwt = function()
{
	var expiry = new Date();
	expiry.setHours(expiry.getHours() + 1);

	return jwt.sign({
		_id : this._id,
		username : this.username,
		exp : parseInt(expiry.getTime() / 1000)
	}, process.env.JWT_Secret);
}

mongoose.model('Exercises', exerciseSchema, 'Exercises');
mongoose.model('Workouts', workoutSchema, 'Workouts');
mongoose.model('Users' , userSchema, 'Users');
mongoose.model('Activities', activitySchema, 'Activities');