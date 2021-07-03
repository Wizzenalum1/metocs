const {lectureModel, courseModel,questionModel} = require('../models');
// const { findById } = require('../models/questionModel');


// const populateModel = function(model,id,field) {
//     return model.findById(id).populate(field);
//   };


module.exports.question = function(req,res){
    console.log(req.query);
    lectureModel.findById(req.query.lecture).populate('questions').exec(function(err,lecture){
        if(err){
            // TODO: add message that lecture not created.
            console.log(`during the searching lectures in question ERROR:${err}`);
        }
        if(lecture){
            // console.log(lecture.questions);
            console.log(`the lecture is ** ${lecture.title} ** which has questions ** ${lecture.questions.length} **`);
            let questionForPanel = null;
            if(lecture.questions.length>=0){
                let id = req.query.question;
                // console.log(questionForPanel," this chak");
                if(!id) questionForPanel = lecture.questions[0];
                else{
                    for(let i of lecture.questions){
                        if(i._id == id) questionForPanel = i; 
                    }
                }
            }
            let context = {
                title:"lecture page",
                lecture:lecture,
                questionForPanel:questionForPanel,
            };
            return res.render('questions',context);
        }
        return res.redirect('/course');
    });
        
}

module.exports.questionCreate = function(req,res){
    console.log(req.body);
    questionModel.create({title:req.body.title,problem:req.body.problem,solution:req.body.solution},function(err,question){
        if(err){
            // TODO: add message that lecture not created.
            console.log(`during the creating lecture ERROR:${err}`);
        }
        if(question){
            console.log(`from the ** ${req.body.title} ** queston is created is ** ${question.title} **`);

            lectureModel.findByIdAndUpdate(req.body.id,{ $push: { questions: question._id }},
                { new: true, useFindAndModify: false }, function(err,doc){
                    if(err) console.log(err);
                    else console.log("question is added to the lecture");
                });
            return res.redirect(`/question/?lecture=${req.body.id}&question=${question._id}`);
        }
        return res.redirect('/course');

    })
}
module.exports.questionUpdate = function(req,res){
    return res.redirect('/questions')
}