const {courseModel} = require('../models')
module.exports.course = function(req,res){
    courseModel.find(function(err,courses){
        if(err){
            // TODO: add message that course not created.
            console.log(`during the searching courses 1 ERROR:${err}`);
        }
        if(courses){
            console.log(`total available courses  ${courses.length}`);
            let context = {
                title:"course page",
                courses:courses,
            };
            return res.render('courses',context);
        }
        return res.redirect('/course');
    })
   
}

module.exports.courseCreate = function(req,res){
    courseModel.create(req.body,function(err,course){
        if(err){
            // TODO: add message that course not created.
            console.log(`during the searching course ERROR:${err}`);
        }
        if(course){
            console.log(`from the*** ${req.body.title} ** course created is ** ${course.title}  ***`);
        }
        return res.redirect('/course');
    })
}
module.exports.courseUpdate = function(req,res){
    return res.redirect('/course')
}