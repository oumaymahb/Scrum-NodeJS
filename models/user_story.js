var mongoose = require('mongoose');
var backlog_sprint = require('./backlog_sprint');
var Schema = mongoose.Schema;
var storySchemas = mongoose.Schema({
	storyname: {
		type: String
	},
	description: {
		type: String
	},
	complexite: {
		type: Number
	},
	estimation: {
		type: Number
	},
	state: {
		type: String,
		enum: [ 'to do', 'doing', 'done' ]
	},
	type: {
		type: String,
		enum: [ 'UX/UI', 'JAVA', 'Back', 'Front' ]
	},
	backlogTask: { type: Schema.Types.ObjectId, ref: 'backlog_sprint' },
	findate: Date
});

var user_story = mongoose.model('user_story', storySchemas, 'user_story');
module.exports = user_story;
