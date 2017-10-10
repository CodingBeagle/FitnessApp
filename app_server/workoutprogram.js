var mongoose = require('mongoose');

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

var  userSchema = new mongoose.Schema(
{
	username : String,
	workoutprograms : [workoutSchema]
});

mongoose.model('Exercises', exerciseSchema, 'Exercises');
mongoose.model('Workouts', workoutSchema, 'Workouts');
mongoose.model('Users' , userSchema, 'Users');
mongoose.model('Activities', activitySchema, 'Activities');