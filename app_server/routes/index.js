var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home.js');
var workoutController = require('../controllers/workout.js');

/* GET home page. */
router.get('/', homeController.index);
router.get('/SignIn', homeController.SignIn);
router.get('/Workout', homeController.Workout);

/*Button Calls*/
router.post('/CreateUser', homeController.CreateUser);
router.post('/Login', homeController.Login);
router.post('/CreateWorkout', homeController.CreateWorkout);
router.post('/DeleteWorkout', homeController.DeleteWorkout);
router.post('/ShowExercises', homeController.ShowExercises);
router.post('/CreateExercise', homeController.CreateExercise);
router.post('/DeleteExercise', homeController.DeleteExercise);

module.exports = router;
