var express = require('express');
var router = express.Router();
var question = require('../models/question')
/* GET users listing. */
router.get('/', function(req, res, next) {
  question.find()
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
    m  = new question({
      contenu : req.body.contenu,
      note : 10,
      type : req.body.type,
      reponses : req.body.reponses,
      examen : req.body.examen
     
  
   });
   m.save(function(err,ques){
       if (err) 
           res.send(err)
       else 
           res.send(ques)
   }) 
   console.log(m)
   console.log("reponses contenu"+ req.body.reponses)
  })

  router.get('/:id',function(req,res){

    var now = new Date()
    let query = {
      "_id" : req.params.id
  }
  console.log('id'+req.params.id)
  question.findById(req.params.id,
    
    function (err, meetings) {
      if (err) return res.send(err)
      res.send(meetings);
  });
   })

  router.delete('/delete/:id', function(req, res, next) {
    let query = {
        "_id" : req.params.id
    }
    //console.log(query)
    question.remove(query,(err)=>{
        if(err) {
            console.log('error supression');
            res.send('suppression error');
        } 
        else{
          res.send('question removed.');
        }
    });
  });

  router.put('/update/:id',function(req,res){

    var now = new Date()
    let query = {
      "_id" : req.params.id
  }
  console.log('id'+req.params.id)
  question.findByIdAndUpdate(req.params.id, {$set: req.body},
    
    function (err, meetings) {
      if (err) return res.send(err)
      res.send('question udpated.');
  });
  })
module.exports=router; 