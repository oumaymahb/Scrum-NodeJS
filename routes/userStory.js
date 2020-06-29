var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userStory = require('../models/userStory');
var nodemailer = require('nodemailer');
var cors = require('cors');
var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    secure: false, // use SSL
    port: 587, // port for secure SMTP
    auth: {
         user: "",
        pass: ""
    },
    tls: { rejectUnauthorized: false }
});

router.post('/add', (req, res) => {
    var userstory = req.body;
    userstory.etat = "ToDo";

    userStory.insertMany(userstory);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.body));

});
router.put('/update', (req, res) => {

    userStory.update({_id: req.body._id}, {$set: req.body}
        , function (err, res) {
            console.log(res);

        });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.body));

});

router.put('/updateEtat',cors(), (req, res) => {

    userStory.update({_id: req.body._id}, {$set: {"etat": req.body.etat}}
        , function (err, res) {
            console.log(res);

        });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.body));

});
router.get('/listByMember/:param1', (req, res) => {


    let query = {"DevTeamMember": req.params.param1};
    userStory.find(query, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            //  res.render('index.twig',{data:data});

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({data}));
        }
    })

});
router.get('/rechercheByName/:param1', (req, res) => {


    let query = {"UserStoryName": req.params.param1};
    userStory.find(query, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            //  res.render('index.twig',{data:data});

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({data}));
        }
    })

});

router.get('/listEtat/:param1',cors(),  (req, res) => {


    let query = {"etat": req.params.param1};
    userStory.find(query, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            //  res.render('index.twig',{data:data});

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({data}));
        }
    })

});

router.get('/email', (req, res) => {



    userStory.find({}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            //  res.render('index.twig',{data:data});
            data.forEach(function(element) {
            if( element.Probleme==true){
                const mailOptions = {
                    from: 'meeseeks.esprit@gmail.com', // sender address
                    to: 'zayneb.barbouche@esprit.tn', // list of receivers
                    subject: 'probleme', // Subject line
                    html: '<p>il ya un probleme </p>'// plain text body
                };


                transporter.sendMail(mailOptions, function (err, info) {
                    if(err)
                        console.log(err)
                    else
                        console.log(info);
                });

                transporter.close();
            }






            });

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({data}));
        }
    })

});
router.get('/list',cors(), (req, res) => {

    userStory.find({}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            //  res.render('index.twig',{data:data});

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({data}));
        }
    })

});
router.post('/workDone/:param', (req, res) => {


    let query = {"DevTeamMember._id": req.params.param};
    userStory.find(query,(err,data)=>{
        if(err){
            //  console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ err }));
            return;
        }else{
            //  res.render('index.twig',{data:data});
            workDone = 0;
            data.forEach(function(element) {


                        if(element.etat.toString() ==='Done' ){
                            workDone++;
                        }
                    }

                );
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ workDone }));

    })

});

module.exports = router;