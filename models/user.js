var mongoose=require('mongoose');
var sprint = require('./sprint')
var Schema=mongoose.Schema;
var userSchema = mongoose.Schema({
firstName:{
    type: String,
  //  required: false
},
lastName:{
    type:String,
  //  required:false
},
username:{
    type:String,
  //  required:false
},
password:{
    type:String,
  //  required:false
},
email:{
    type:String,
    required:false,
    trim:true,
    minlength:1
},
role:{
    type:String,
    enum:['ScrumMaster','DevTeamMember','ProductOwner','HR'],
    required:false
},
telephone:{
    type:String
},
image:{
    type:String
},
sprint:[
  {type:Schema.Types.ObjectId,ref:'sprint'}
],
meetings:[
  {type:Schema.Types.ObjectId,ref:'meetings'}
],
userStories:[
{type:Schema.Types.ObjectId,ref:'UserStory'}
],
rates:[
{type:Schema.Types.ObjectId,ref:'rate'}
]

});
var User=mongoose.model('User',userSchema,'User');
module.exports=User;