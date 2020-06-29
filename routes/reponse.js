var express = require('express');
var router = express.Router();
var reponses = require('../models/reponse')
var url = require('url');
var querystring = require('querystring');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var users = null ; 
  reponses.find().
      exec()
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
    m  = new reponses({
      contenu : req.body.contenu,
      valeur : req.body.valeur,
      question : req.body.question
      
  
   });
   m.save(function(err,user){
    if (err) 
        res.send(err)
    else 
        res.send(user)
    }) 
  console.log(m)

  })

  router.put('/update/:id',function(req,res){

    var now = new Date()
    let query = {
      "_id" : req.params.id
  }
  console.log('id'+req.params.id)
  reponses.findByIdAndUpdate(req.params.id, {$set: req.body},
    
    function (err, meetings) {
      if (err) return res.send(err)
      res.send('reponses udpated.');
  });
  
  })


  router.get('/id/:id',function(req,res){
   
    var now = new Date()
    let query = {
      "_id" : req.params.id
  }
  console.log('id'+req.params.id)
  reponses.findById(req.params.id,
    
    function (err, reponses) {
      if (err) return res.status(404).send("no reponse found")
     else res.send(reponses);
  });
  })

  router.delete('/delete/:id', function(req, res, next) {
    let query = {
        "_id" : req.params.id
    }
    //console.log(query)
    reponses.remove(query,(err)=>{
        if(err) {
            console.log('error supression');
            return;
        } 
        else{
          res.send('reponse  deleted.');
        }
    });
  
  });


  // get reponse by id question 
  router.get('/question',function(req,res){
    var idQuestion = req.query.id 
    console.log(idQuestion)
    reponses.find({question:idQuestion},
    
      function (err, reponses) {
        if (err) return res.status(404).send("no reponse found")
       else res.send(reponses);
    });
  
  })
module.exports=router; 