var mongoose = require('mongoose')
var project=require('./project')
var sprint=require('./sprint')
var Schema=mongoose.Schema;
var userStory = mongoose.Schema({
    _id:String,
    userStory:String,
    priority:Number,
    timeestimation:Number
    });
var releaseschema = mongoose.Schema({
    title:{
        type:String
    },
goals:{
    type:String
},
status:{
    type:String,
    enum:['unstarted','inProgress','released','unreleased'],
},
startingDate:{
    type:Date
},
releaseDate:{
    type:Date
},
numberSprint:{
    type:Number
},
userstories: [userStory],
sprints:[ {type:Schema.Types.ObjectId,ref:'sprint'}],
project:{type:Schema.Types.ObjectId,ref:'project'}
});
var release =mongoose.model('release',releaseschema,'release');
module.exports=release;