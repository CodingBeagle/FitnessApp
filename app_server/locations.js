var mongoose = require('mongoose');

var exerciseSchema = new mongoose.Schema(
{
	name : String,
	description: String,
	sets: Number,
	reps: String
});

var  userSchema = new mongoose.Schema(
{
	username : String,
	exerciseprogram : [exerciseSchema]
});

mongoose.model('Exercise', exerciseSchema);
mongoose.model('Users' , userSchema);