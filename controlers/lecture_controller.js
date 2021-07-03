const {lectureModel, courseModel,questionModel} = require('../models');



module.exports.lecture = function(req,res){
    console.log(`lecture id is ${req.query.course} `);
    courseModel.findById(req.query.course).populate('lectures').exec(function(err,course){
        if(err){
            // TODO: add message that course not created.
            console.log(`during the searching courses in lecture ERROR:${err}`);
        }
        if(course){
            console.log(`from the course ** ${course.title} ** nomber of lectures are ** ${course.lectures.length} **`);
            let context = {
                title:"course page",
                course:course,
            };
            // return res.redirect('/course');

            return res.render('lectures',context);
        }
        return res.redirect('/course');
    });
        
}

module.exports.lectureCreate = function(req,res){
    lectureModel.create({title:req.body.title,about:req.body.about},function(err,lecture){
        if(err){
            // TODO: add message that lecture not created.
            console.log(`during the creating lecture ERROR:${err}`);
        }
        if(lecture){
            courseModel.findByIdAndUpdate(req.body.id,{ $push: { lectures: lecture._id }},
                { new: true, useFindAndModify: false }, function(err,doc){
                    if(err) console.log(err);
                    else console.log("lecture is added to course");
                });
            console.log(`from the ** ${req.body.title} ** lecture  courser created is ** ${lecture.title} **`);
            return res.redirect(`/lecture/?course=${req.body.id}`);
        }
        return res.redirect('/lecture');

    })
}
module.exports.lectureUpdate = function(req,res){
    return res.redirect('/lecture')
}