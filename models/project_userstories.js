var mongoose = require('mongoose')
var backlog_projet=require('./backlog_projet')
var Schema=mongoose.Schema;
var userschema = mongoose.Schema({
userStory:String,
priority:Number,
timeestimation:Number,
backlog_projet:backlog_projet
});
var project_userstories =mongoose.model('project_userstories',userschema,'project_userstories');
module.exports=project_userstories;