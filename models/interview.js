var mongoose=require('mongoose');
var Interview=require('./interview');
var Schema=mongoose.Schema;
var interviewSchema = mongoose.Schema({
    InterviewName:{
        type:String
    },
    Date:{
        type:Date
    },


    Condidature:{type:Schema.Types,ref:'User'},

});
var Interview=mongoose.model('Interview',interviewSchema,'Interview');
module.exports=Interview;