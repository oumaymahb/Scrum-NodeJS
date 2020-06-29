var mongoose = require('mongoose')
var sprint = require('./sprint')
var userschema = mongoose.Schema({
    sujet:String,
    contenu:String,
    user:user,
    sprint:sprint,
    note:Number
})
var retrospective =mongoose.model('retrospective',userschema,'retrospective');
module.exports=retrospective;