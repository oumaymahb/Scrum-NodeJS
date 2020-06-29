var express = require('express');
var router = express.Router();
var msg = require('../models/messages')


/* GET users listing. */
router.get('/', function(req, res, next) {
  msg.find()
  .then((data)=>{
     // res.setHeader("Access-Control-Allow-Origin", "*"),
     // res.statusCode=200,
      //res.contentType('application/json'),
      res.json(data)
  })
  .catch((err)=> {
      console.log('erreur');
  })
  });


  router.post('/add',function(req,res){

    var now = new Date()
    m  = new msg({
      contenu : req.body.contenu,
      date : now,
      discussion : req.body.discussion,
      meeting : req.body.meeting,
      sender : req.body.sender
     
  
   });
   m.save(function(err,message){
       if (err) 
           res.send(err)
       else 
           res.send(message)
   }) 
   console.log(m)
  })


  router.get('/idmeeting/:id',function(req,res){

    var now = new Date()
    let query = {
      "_id" : req.params.id
  }
  console.log('id'+req.params.id)
  msg.find({meeting:req.params.id},
    
    function (err, msgs) {
      if (err) return res.send(err)
      res.send(msgs);
  });
  
  })


module.exports=router; 
