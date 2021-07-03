const mongoose = require('mongoose');
const lectureModel = require('./lectureModel')

const courseSchema = new mongoose.Schema({
    title:  String,
    about:String,
    lectures:[
              {
                type: mongoose.Schema.Types.ObjectId,
                ref: "lectureModel"
              }
    ]},
  {
    timestamps:true
  });
const Course = mongoose.model('Course',courseSchema);

module.exports = Course;