var mongoose=require('mongoose');
var User=require('./user');
var release=require('./releases');
var userstory=require('./project_userstories')
var project=require('./project')
var Schema=mongoose.Schema;
var issueSchema = mongoose.Schema({
    title:{
        type:String
    },
    type:{
        type:String,
        enum:['task','sub-task','bug','story','epic']
    },
    createdDate:{
        type:Date
    },
    solvedDate:{
        type:Date
    },
    description:{
        type:String
    },
    language:{
        type:String
        
    },
    priority:{
        type:Number
    },
    status:
    {   type:String,
        enum:['solved','in progress','not solved']},

    userstory:{type:Schema.Types.ObjectId,ref:'userstory'},
    createdBy:{type:Schema.Types.ObjectId,ref:'User'},
    release:{type:Schema.Types.ObjectId,ref:'release'},
    project:{type:Schema.Types.ObjectId,ref:'project'},
    technology:{
        type:String
    }
});

var Issue=mongoose.model('issue',issueSchema,"issue");
module.exports=Issue;