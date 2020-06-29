var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var etat = require('../models/etat');
var cors = require('cors');
router.post('/add', (req, res) => {


    etat.insertMany(req.body);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.body));

});
router.get('/listByName/:param1',cors(), (req, res) => {
let query = {"EtatName": req.params.param1};
    etat.find(query, (err, data) => {
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
router.get('/list',cors(), (req, res) => {

    etat.find({}, (err, data) => {
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
router.put('/update' ,cors(),(req, res) => {
console.log(req.body.etat);

    etat.update({"_id": req.body._id}, {$set:{"EtatName": req.body.etat}}
        , function (err, res) {
            console.log(res);

        });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.body));

});

module.exports = router;