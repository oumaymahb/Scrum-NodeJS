var mongoose = require('mongoose')
var question = require('./question')
var reponse = require('./reponse')
var user=require('./user')
var Schema=mongoose.Schema;
var userschema = mongoose.Schema({
    title:String,
    date:Date,
    niveau :{
        type:String,
        enum:['A','B','C','Entretien'],
        required:false
    },
    type :{
        type:String,
        enum:['java','nodeJs','reactJs','.Net'],
        required:false
    },
    url :{
        type:String,
        required:false
    },
    
    duree : Number,
    questions:[
        {type:Schema.Types.ObjectId,ref:'question'}
    ],
    reponses:[
        {type:Schema.Types.ObjectId,ref:'reponses'}
    ],
    user:{type:Schema.Types.ObjectId,ref:'user'},
})
var examen =mongoose.model('examen',userschema,'examen');
module.exports=examen;