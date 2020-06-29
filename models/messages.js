var mongoose = require('mongoose')
var user = require('./user')
var Schema=mongoose.Schema;
var userschema = mongoose.Schema({
    contenu:String,
    date:Date,
    discussion:{type:Schema.Types.ObjectId,ref:'discussion'},
    meeting:{type:Schema.Types.ObjectId,ref:'meetings'},
    sender:{type:Schema.Types.ObjectId,ref:'User'},
})
var messages =mongoose.model('messages',userschema,'messages');
module.exports=messages;