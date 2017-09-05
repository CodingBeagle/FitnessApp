var mongoClient = require('mongoose');

var dbURI = 'mongodb://localhost/27017/';
mongoClient.connect(dbURI, function(err,db)
{
	console.log("Connected successfully to " + dbURI);
	console.log("No errors : " + err != null);
});