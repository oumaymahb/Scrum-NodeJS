var mongoose = require('mongoose')
var User = require('./user')
var Schema=mongoose.Schema;
var userschema = mongoose.Schema({
    title:String,
    type:{
        type:String,
        enum:['java','nodeJs','reactJs','.Net'],
        required:false
    },
    verfied : {
            type : Boolean,
            required : false
    },
    date:Date,
    note:Number,
    examen:{type:Schema.Types.ObjectId,ref:'examen'},
    user:{type:Schema.Types.ObjectId,ref:'user'},
})
var evaluation =mongoose.model('evaluation_Teck',userschema,'evaluation_Teck');
module.exports=evaluation;