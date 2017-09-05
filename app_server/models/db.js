var mongoose = require('mongoose');
var readLine = require('readline');

if (process.platform === "win32"){
	var rl = readLine.createInterface (
	{
		input: process.stdin,
		output: process.stdout
	});

	rl.on ("SIGINT", function ()
	{
		process.emit ("SIGINT");
	});
}

var dbURI = 'mongodb://localhost/27017/';
mongoose.connect(dbURI);


mongoose.connection.on('connected', function()
{
	console.log('Connected to mongo on ' + dbURI);
});

mongoose.connection.on('error', function(err)
{
	console.log('Error: ' + err);
});

mongoose.connection.on('disconnected', function()
{
	console.log('Disconnected from MongoDB');
});

var gracefulShutdown = function (msg, callback) 
{
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};

process.once('SIGUSR2', function () 
{
	gracefulShutdown('nodemon restart', function () 
	{
		process.kill(process.pid, 'SIGUSR2');
	});
});

process.on('SIGINT', function () 
{
	gracefulShutdown('app termination', function () 
	{
		process.exit(0);
	});
});

process.on('SIGTERM', function() 
{
	gracefulShutdown('Heroku app shutdown', function () 
	{
		process.exit(0);
	});
});

require('../workoutprogram.js');