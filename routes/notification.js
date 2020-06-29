var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var notification=require('../models/notifications')
router.post('/add/:id', (req,res)=> {
    n  = new notification ({
        title : req.body.title,
        date : req.body.date,
        content : req.body.content,
        createdBy : req.params.id,
        to: req.body.sprints
    })
  
           n.save()
           res.status(200).json(n)

        })

module.exports = router;