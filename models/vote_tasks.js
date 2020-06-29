var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var voteySchemas = mongoose.Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	task_id: {
		type: Schema.Types.ObjectId,
		ref: 'backlog_sprint'
	},
	state: {
		type: String,
		enum: [ 'en cours', 'accepted', 'refused' ]
	}
});

var vote_task = mongoose.model('vote_task', voteySchemas, 'vote_task');
module.exports = vote_task;
