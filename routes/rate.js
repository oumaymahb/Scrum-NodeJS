var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var rate = require('../models/rate');
var cors = require('cors');

router.post('/add', (req, res) => {


    rate.insertMany(req.body);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.body));

});
router.get('/listDevMemberRate/:param1',cors(), (req, res) => {

    //let query = {"sprint": req.params.param1};
    let query = {"sprint": req.params.param1};
    rate.find(query, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            //  res.render('index.twig',{data:data});

            //let devs= data.populate("DevTeamMember");
            let devs =data
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({devs}));
        }
    }).populate("DevTeamMember");

});
router.get('/update/:param1/:param2',cors(),(req, res) => {

    let query = {"_id": req.params.param1,"note": req.params.param2};
    rate.update({_id: query._id}, {$set: {"note":query.note}}
        , function (err, res) {
            console.log(res);

        });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.body));

});

module.exports = router;