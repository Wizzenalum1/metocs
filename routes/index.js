//this file link all the routes to the index bia router of express.
const express = require('express');
const router = express.Router();


const courseController = require('../controlers/course_controller');// import the contorller
const lectureController = require('../controlers/lecture_controller');// import the contorller
const questionController = require('../controlers/question_controller');// import the contorller


router.get('/',function(req,res){
    
    return res.render('home',{title:"home"});
}); 


// routes to courses
router.get('/course',courseController.course); 
router.post('/course-create',courseController.courseCreate); 
router.post('/course-update',courseController.courseUpdate); 

// routes to lectures
router.get('/lecture/',lectureController.lecture); 
router.post('/lecture-create',lectureController.lectureCreate); 
router.post('/lecture-update',lectureController.lectureUpdate); 

// routes to questions
router.get('/question/',questionController.question); 
router.post('/question-create',questionController.questionCreate); 
router.post('/question-update',questionController.questionUpdate); 



module.exports = router; // exporting the router .