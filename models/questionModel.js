const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title:String,
    problem:[String],  // <h2> heading</h2>, <p> para</p>, <pre> to save format</pre>
    solution:[String], // <python> <java>
    hint:[String], 
    start:Date,
    complete:Boolean,
    idealTime:Number, //time in minutes
    duration:Number, //in minutes
    },
  {
    timestamps:true
  });
const Question = mongoose.model('questionModel',questionSchema);

module.exports = Question;