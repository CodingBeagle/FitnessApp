var mongoose = require('mongoose');

var exerciseSchema = new mongoose.Schema(
{
	exerciseName : String,
	description: String,
	sets: Number,
	reps: String
});

var workoutSchema = new mongoose.Schema(
{
	workoutName: String,
	exercises : [exerciseSchema]
});

var  userSchema = new mongoose.Schema(
{
	username : String,
	workoutprograms : [workoutSchema]
});

mongoose.model('Exercises', exerciseSchema, 'Exercises');
mongoose.model('Workouts', workoutSchema, 'Workouts');
mongoose.model('Users' , userSchema, 'Users');