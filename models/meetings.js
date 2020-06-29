var mongoose = require('mongoose')
var sprint = require('./sprint')
var User = require('./user')
var Schema=mongoose.Schema;
var meetingschema = mongoose.Schema({
    type:{
        type:String
    },
    date:Date,
    sprint:{type:Schema.Types.ObjectId,ref:'sprint'},

    DevTeamMember:[
        {type:Schema.Types.ObjectId,ref:'User'}
    ],
    title:String,

    startDate : String,
    duree : Number,
    feedback : String,
    scrumMaster:{type:Schema.Types.ObjectId,ref:'User'},
    devTeam:[
        {type:Schema.Types.ObjectId,ref:'User'}
    ]
})
var meetings =mongoose.model('meetings',meetingschema,'meetings');
module.exports=meetings;