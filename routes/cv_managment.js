var express = require('express');
var router = express.Router();
var formationModels = require('../models/competance');
var nodemailer = require('nodemailer');
var path = require('path');

router.post('/addCompetance/:user', (req, res) => {
	formation = new formationModels();
	formation = req.body;
	formation.user = req.params.user;
	formationModels.insertMany(formation);
	mailsend(req.body.title, req.body.description, req.body.attachments);

	res.send('demande sent ');
	console.log(formation);
});

router.get('/formationDemand', (req, res) => {
	formationModels
		.find({ state: 'en cours' })
		.then((data) => {
			res.json(data);
		})
		.catch(() => {
			console.log('error');
		});
});

router.get('/acceptDemand/:id', (req, res) => {
	formationModels.findByIdAndUpdate(req.body.id, { state: 'accepted' }, function(err, vote_taskModel) {
		if (err) return res.send(err);
		res.send('demand accepted');
	});
});

router.get('/refuseDemand/:id', (req, res) => {
	formationModels.findByIdAndUpdate(req.body.id, { state: 'refused' }, function(err, vote_taskModel) {
		if (err) return res.send(err);
		res.send('demand accepted');
	});
});

router.get('/dispalyMydemand/:id', (req, res) => {
	formationModels
		.find()
		.then((data) => {
			res.json(data);
		})
		.catch(() => {
			console.log('error');
		});
});

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'pi.dev1920@gmail.com',
		pass: '98945544a'
	}
});

function mailsend(subject, contenu, attachments) {
	var mailOptions = {
		from: 'pi.dev1920@gmail.com',
		to: 'iheb.manai@esprit.tn',
		subject: subject,
		text: contenu,
		attachments: [
			{
				path: path.basename('C:\\Users\\ASUS\\Desktop\\kasandra.txt')
			}
		]
	};
	transporter.sendMail(mailOptions, async function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}

module.exports = router;
