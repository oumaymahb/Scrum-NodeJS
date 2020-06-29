var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var interview = require('../models/interview');


router.post('/add', (req, res) => {



    interview.insertMany(req.body);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.body));

});

router.get('/list', (req, res) => {

    interview.find({}, (err, data) => {
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


module.exports = router;