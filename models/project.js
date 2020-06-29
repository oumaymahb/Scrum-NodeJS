var mongoose=require('mongoose');
var User=require('./user');
var release=require('./releases');
var Schema=mongoose.Schema;
var projectSchema = mongoose.Schema({
    projectName:{
        type:String
    },
    key:{
        type:String
    },
    startingDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    description:{
        type:String
    },
    status:
    {   type:String,
        enum:['not started','in progress','done','not done']},

    productOwner:{type:Schema.Types.ObjectId,ref:'User'},
    scrumMaster:{type:Schema.Types.ObjectId,ref:'User'},
    devTeam:[
        {type:Schema.Types.ObjectId,ref:'User'}
    ],
    releases:[
        {type:Schema.Types.ObjectId,ref:'release'}
    ]
});

var Project=mongoose.model('Project',projectSchema,"project");
module.exports=Project;