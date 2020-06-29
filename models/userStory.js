var mongoose=require('mongoose');
var UserStory=require('./userStory');
var Schema=mongoose.Schema;
var userStroySchema = mongoose.Schema({
    UserStoryName:{
        type:String
    },
    startingDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    description:{
        type:String
    },
    etat:{
        type:String,

        required:false
    },
    Probleme:{
        type:Boolean,

        required:false
    },

    DevTeamMember:{type:Schema.Types,ref:'User'},
    sprint_backlog:{type:Schema.Types.ObjectId,ref:'backlog_sprint'}



});
var UserStory=mongoose.model('UserStory',userStroySchema,'UserStory');
module.exports=UserStory;