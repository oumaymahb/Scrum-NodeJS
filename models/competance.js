var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var formationschema = mongoose.Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	state: {
		type: String,
		enum: [ 'en cours', 'accepted', 'refused' ]
	},
	cv: {
		//  type:Schema.Types.ObjectId,ref:'cv'
		type: Number
	},
	note: {
		tyep: String
	},

	user: {
		type: { type: Schema.Types.ObjectId, ref: 'user' }
	},
	attachments: String
});
var formation = mongoose.model('formation', formationschema, 'formation');
module.exports = formation;
