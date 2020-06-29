var express = require('express');
var router = express.Router();
var backlog = require('../models/backlog_sprint');
var userStory = require('../models/user_story');
var vote_taskModel = require('../models/vote_tasks');
var cron = require('node-cron');
var nodemailer = require('nodemailer');
var notification = require('../models/notifications');
var path = require('path');
var brain = require('brain.js');
const serializer = require('./serializer');
var user = require('../models/user');
var backlog_sprint = require('../models/backlog_sprint');
router.post('/', (req,res)=> {


    backlog_sprint.insertMany(req.body);
    console.log("hnhgn");
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.body ));

});
router.post('/addTask/:id', (req, res) => {
	back = new backlog();
	back = req.body;
	back.complexite = 0;
	back.state = 'to do';
	back.estimation = 0;
	back.sprint = 1;
	backlog.insertMany(back).then((data) => {
		res.send(data);
	});
	console.log('ooo');
});
router.get('/delete/:id', async (req, res) => {
	await userStory.findByIdAndRemove(req.params.id).then((res) => console.log(res));
	res.json('ok');
});
router.get('/getall', (req, res) => {
	userStory.find().then((data) => {
		res.json(data);
	});
});
router.post('/addStory/:id', async (req, res) => {
	story = new userStory();

	story = req.body;
	story.backlogTask = req.params.id;
	story.state = 'to do';
	console.log(story);
	await userStory.insertMany(story).then((data) => {
		res.json(data);
	});
	await updateTask(req.params.id);

	//ps: l estimation est la somme de user sotry , la complexité est la moy de complexxité .
});

router.get('/displaytasks/:sprint', (req, res) => {
	backlog
		.find({ devoloper: { $ne: null } })
		.then((data) => {
			res.json(data);
		})
		.catch(() => {
			res.json({ _id: null, name: 'no one ' });
		});
});

router.get('/taskByid/:id', (req, res) => {
	backlog
		.findById({ _id: req.params.id })
		.then((data) => {
			res.json(data);
		})
		.catch(() => {
			console.log('error');
		});
});

router.get('/dispalystory/:task', (req, res) => {
	userStory
		.find({ backlogTask: req.params.task })
		.then((data) => {
			res.json(data);
		})
		.catch(() => {
			console.log('error');
		});
});

router.get('/dispalystory/:task', (req, res) => {
	userStory
		.find({ backlogTask: req.params.task })
		.then((data) => {
			res.json(data);
		})
		.catch(() => {
			console.log('error');
		});
});

router.post('/voteTask', (req, res) => {
	vote = new vote_taskModel();
	console.log(req.body);
	vote = req.body;
	vote.state = 'en cours';
	vote_taskModel.insertMany(vote);
	res.send('voted');
});

router.get('/voteTask/:task/:user', (req, res) => {
	vote = new vote_taskModel({ user_id: req.params.user, task_id: req.params.task });
	vote_taskModel.insertMany(vote);
});
router.get('/diplayallVote', (req, res) => {
	vote_taskModel
		.find({ state: 'en cours' })
		.then((data) => {
			res.json(data);
		})
		.catch(() => {
			console.log('error');
		});
});

router.get('/displayVote/:user', (req, res) => {
	vote_taskModel
		.find({ user_id: req.params.user })
		.then((data) => {
			res.json(data);
		})
		.catch(() => {
			console.log('error');
		});
});

router.post('/acceptTask', async (req, res) => {
	vote = new vote_taskModel();
	await vote_taskModel.findByIdAndUpdate(req.body.vote_id, { state: 'accepted' }, function(err, vote_taskModel) {
		if (err) return res.send(err);
	});
	await backlog.findByIdAndUpdate(req.body.task_id, { devoloper: req.body.user_id }, function(err, vote_taskModel) {
		res.send(vote_taskModel);
	});
	await notification.insertMany({
		date: new Date(),
		contenu: 'your task vote has been accepted',
		user: req.body.user_id
	});
});

router.get('/refuseTask/:id', (req, res) => {
	vote_taskModel.findByIdAndUpdate(req.params.id, { state: 'refused' }, function(err, vote_taskModel) {
		if (err) return res.send(err);
		res.send('Vote refused');
	});
});

router.get('/unaffectedTasks/:id', (req, res) => {
	backlog
		.find({ devoloper: null })
		.then((data) => {
			res.json(data);
		})
		.catch(() => {
			console.log('error');
		});
});
router.get('/affecttask/:task/:user', (req, res) => {
	backlog.findByIdAndUpdate(req.params.task, { devoloper: req.params.user }, function(err, backlog) {
		if (err) return res.send(err);
		res.send('task affected');
	});
});
router.get('/getnotif/:user', (req, res) => {
	notification
		.find()
		.then((data) => {
			res.json(data);
		})
		.catch(() => {
			console.log('error');
		});
});

router.get('/lanchvote', (req, res) => {
	notif = new notification({ date: new Date(), contenu: 'the vote has started go make your wish list' });
	notification.insertMany({ date: new Date(), contenu: 'the vote has started go make your wish list', to: 'all' });
	mailsend('Vote has started', 'the vote has started go make your wish list');
	res.json(notif);
});

router.get('/avg', (req, res) => {
	userStory.aggregate(
		[
			[
				{
					$match: { backlogTask: '5ca4bd0ee1c4f2372c659e4e' }
				},
				{
					$group: {
						_id: null,
						avgSolvedTime: { $avg: '$estimation' }
					}
				}
			]
		],
		function(err, result) {}
	);
	updateTask();
});
router.get('/user/:id', (req, res) => {
	console.log(req.params.id);
	user
		.findById({ _id: req.params.id })
		.then((data) => {
			res.json(data);
		})
		.catch((e) => {
			console.log(e);
		});
});

router.post('/predict', (req, res) => {
	const net = new brain.NeuralNetwork();
	trainData = [
		{
			input: 'html java api login interface ',
			output: { time: 0.1, complexite: 0.5 }
		},
		{
			input: 'react interface ux/ui',
			output: { time: 1, complexite: 0.5 }
		},
		{
			input: 'java react interface login register',
			output: { time: 0.5, complexite: 0.5 }
		}
	];
	net.train(serializer.serialize(trainData), { log: true });

	const output = net.run(serializer.encode(req.body.desc));

	res.json(output);
});
router.post('/rec', (req, res) => {
	var net = new brain.NeuralNetwork();
	trainData = [
		{
			input: 'html java api login interface ',
			output: { '5ca4c3ac3bfc1ab634ecab55': 1 }
		},
		{
			input: 'react interface ux/ui',
			output: { '5ca4c3ac3bfc1ab634ecab55': 1 }
		},
		{
			input: 'java react interface login register',
			output: { '5ca4c3ac3bfc1ab634ecab55': 1 }
		}
	];
	net.train(serializer.serialize(trainData), { log: true });

	var output = net.run(serializer.encode(req.body.desc));
	user
		.findById({ _id: Devid(output) })
		.then((data) => {
			res.json(data);
			console.log(data);
			console.log(req.body);
		})
		.catch(() => res.json({ _id: null, name: 'no one ' }));
});

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'pi.dev1920@gmail.com',
		pass: '98945544a'
	}
});

function mailsend(subject, contenu) {
	var mailOptions = {
		from: 'pi.dev1920@gmail.com',
		to: 'iheb.manai@esprit.tn',
		subject: subject,
		text: contenu
		/*	attachments: [
			{
				path: path.basename('C:\\Users\\ASUS\\Desktop\\kasandra.txt')
			}
		]*/
	};
	transporter.sendMail(mailOptions, async function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}
async function updateTask(id) {
	var lsitok = [];
	console.log(id);
	var moy = 0;
	var complexite = 0;
	await userStory.find({ backlogTask: id }, async function(error, result) {
		await result.forEach(function(value) {
			complexite = value.complexite + complexite;
			moy = value.estimation + moy;
			console.log(value);
		});
		await backlog.findByIdAndUpdate(id, { complexite: complexite / (result.length + 1), estimation: moy }, function(
			err,
			backlog
		) {
			console.log(backlog);
		});
	});
}
async function votevalidation() {
	var moytime = 0;
	var moytimevote = 0;
	var test = true;
	await backlog.find(function(err, result) {
		result.forEach(function(value) {
			moytime = value.estimation + moytime;
		});
		vote_taskModel.find({ user_id: '5ca4c3ac3bfc1ab634ecab55' }, function(err, result) {
			result.forEach(function(value) {
				backlog.find(function(err, result) {});
			});
		});
	});
}
function Devid(result) {
	let highestValue = 0;
	let highestDeveloper = '';
	for (let Devid in result) {
		if (result[Devid] > highestValue) {
			highestValue = result[Devid];
			highestDeveloper = Devid;
		}
	}

	return highestDeveloper;
}
module.exports = router;
