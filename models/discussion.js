var mongoose = require('mongoose')
var Schema=mongoose.Schema;
var userschema = mongoose.Schema({
    tilte:String,
    startDate:Date,
    meeting:{type:Schema.Types.ObjectId,ref:'meetings'},
    user:{type:Schema.Types.ObjectId,ref:'user'},
})
var discussion =mongoose.model('discussion',userschema,'discussion');
module.exports=discussion;