
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cors = require('cors');
var sprint = require('../models/sprint');
router.post('/add', (req, res) => {


    sprint.insertMany(req.body);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.body));

});
router.get('/list',cors(), (req, res) => {

sprint.find({}, (err, data) => {
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
router.get('/listDevMember/:param1',cors(), (req, res) => {

    //let query = {"DevTeamMember": req.params.param1};
    let query = {"_id": req.params.param1};
    sprint.find(query, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            //  res.render('index.twig',{data:data});

            //let devs= data.populate("DevTeamMember");
    let devs =data[0].DevTeamMember
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({devs}));
        }
    }).populate("DevTeamMember");

});
router.get('/listMeeting/:param1', (req, res) => {

    //let query = {"DevTeamMember": req.params.param1};
    let query = {"_id": req.params.param1};
    sprint.find(query, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            //  res.render('index.twig',{data:data});


            let meetings =data[0].Meetings
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({meetings}));
        }
    })

});
module.exports = router;