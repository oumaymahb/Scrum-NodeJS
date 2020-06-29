var mongoose = require('mongoose')
var Schema=mongoose.Schema;
var userschema = mongoose.Schema({
    contenu:String,
    note:Number,
    niveau :String,
    type :String,
    reponses:[
        {type:Schema.Types.ObjectId,ref:'reponse'}
    ],
    examen:{type:Schema.Types.ObjectId,ref:'examen'},
    

})


var question =mongoose.model('question',userschema,'question');
module.exports=question;