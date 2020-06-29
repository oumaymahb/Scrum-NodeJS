var mongoose=require('mongoose');
var etat=require('./etat');
var Schema=mongoose.Schema;
var etatSchema = mongoose.Schema({
    EtatName:{
        type:String
    },
    UserStories:[
        {type:Schema.Types.ObjectId,ref:'UserStory'}
    ]




});
var etat=mongoose.model('etat',etatSchema,'etat');
module.exports=etat;