var mongoose = require('mongoose')
var sprint = require('./sprint')
var user=require('./user')
var Schema=mongoose.Schema;
var userschema = mongoose.Schema({
    taskname:String,
    descrip:String,
    estimation:Number,
    complexite:Number,
    state:{
        type:String,
        enum:["to do","doing","done"]
    },
    devoloper:{type:Schema.Types.ObjectId,ref:'user'},
    sprint:Number
    //{type:Schema.Types.ObjectId,ref:'sprint'}    
    
    });
var backlog_sprint =mongoose.model('backlog_sprint',userschema,'backlog_sprint');
module.exports=backlog_sprint;