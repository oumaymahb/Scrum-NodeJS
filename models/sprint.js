var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var project = require('../models/project');
var Schema=mongoose.Schema;
var userschema = mongoose.Schema({
    name:String,
    //type:{enum:['JAVA','NODEJS']},
    delai:Date,
    project:{type:Schema.Types.ObjectId,ref:'project'},
    type:String,
    DevTeamMember:[
        {type:Schema.Types.ObjectId,ref:'User'}
    ],
    Meetings:[
        {type:Schema.Types.ObjectId,ref:'Meetings'}
    ]
    ,rates:[
        {type:Schema.Types.ObjectId,ref:'rate'}
    ]




})

var sprint =mongoose.model('sprint',userschema,sprint);
module.exports=sprint;