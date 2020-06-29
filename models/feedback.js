var mongoose = require('mongoose')
var sprint = require('./sprint')
var userschema = mongoose.Schema({
    sujet:String,
    contenu:String,
    user:user,
    
})
var feedback =mongoose.model('feedback',userschema,'feedback');
module.exports=feedback;