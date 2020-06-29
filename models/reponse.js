var mongoose = require('mongoose')
var Schema=mongoose.Schema;
var userschema = mongoose.Schema({
    contenu:String,
    valeur:Boolean,
    question:{type:Schema.Types.ObjectId,ref:'question'},
    user:{type:Schema.Types.ObjectId,ref:'user'},
})
var reponse =mongoose.model('reponse',userschema,'reponse');
module.exports=reponse;