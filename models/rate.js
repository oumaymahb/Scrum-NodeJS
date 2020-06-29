var mongoose=require('mongoose');
var Rate=require('./rate');
var Schema=mongoose.Schema;
var rateSchema = mongoose.Schema({
    note:{
        type:Number
    },

    DevTeamMember:{type:Schema.Types.ObjectId,ref:'User'},
    sprint:{type:Schema.Types.ObjectId,ref:'sprint'}

});

var Rate=mongoose.model('Rate',rateSchema,'Rate');
module.exports=Rate;