var mongoose = require('mongoose')
var project=require('./project')
var userstory=require('./project_userstories')
var Schema=mongoose.Schema;
var userstory =  mongoose.Schema({
    userStory:String,
    priority:Number,
    timeestimation:Number
    });
var userschema = mongoose.Schema({
userstories: [userstory],
project:{type:Schema.Types.ObjectId,ref:'project'}

});
var backlog_projet =mongoose.model('backlog_projet',userschema,'backlog_projet');
module.exports=backlog_projet;