const mongoose = require('mongoose');
const questionModel = require('./questionModel')


const lectureSchema = new mongoose.Schema({
    title:  String,
    about:String,
    complete:Boolean,
    start:Date,
    end:Date,
    questions:[
              {
                type: mongoose.Schema.Types.ObjectId,
                ref: "questionModel"
              }
    ]},
  {
    timestamps:true
  });
const Lecture = mongoose.model('lectureModel',lectureSchema);

module.exports = Lecture;