var express = require('express');
var router = express.Router();
var examen = require('../models/exam')
var question = require('../models/question')
var user = require('../models/user');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'dhiabsdl94@gmail.com',
         pass: 'D58059894'
     }
 });

/* GET users listing. */
router.get('/', function(req, res, next) {
  var users = null ; 
  examen.find()
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
    m  = new examen({
      title : req.body.title,
      date :  now , 
      niveau :req.body.niveau, 
      url : "http://localhost:3001/#/begin",
      type : req.body.type,
      duree : req.body.duree
   });
   m.save(function(err,examen){
       if (err) 
           res.send(err)
       else 
           res.send(examen)
   }) 
   console.log(m)
 
})

router.get('/id/:id',function(req,res){
   
  var now = new Date()
  let query = {
    "_id" : req.params.id
}
console.log('id'+req.params.id)
examen.findById(req.params.id,
  
  function (err, reponses) {
    if (err) return res.status(404).send("no examen found")
   else res.send(reponses);
});
})

router.put('/update/:id',function(req,res){

  var now = new Date()
  let query = {
    "_id" : req.params.id
}
console.log('id'+req.params.id)
examen.findByIdAndUpdate(req.params.id, {$set: req.body},
  
  function (err, meetings) {
    if (err) return res.send(err)
    res.send('exam udpated.');
});

})


router.delete('/delete/:id', function(req, res, next) {
  let query = {
      "_id" : req.params.id
  }
  //console.log(query)
  examen.remove(query,(err)=>{
      if(err) {
          console.log('error supression');
          return;
      } 
      else{
        res.send('exam  deleted.');
      }
  });

});



// recherche des examens suivant le type : java .net (il manque le && pour choisir le niveau)
router.get('/type',function(req,res){
  var typeExam = req.query.type 
  console.log(typeExam)
  examen.aggregate([ 
    { $match: { "type": typeExam
  }},
  ],
  
    function (err, reponses) {
      if (err) return res.status(404).send("no reponse found")
     else res.send(reponses);
  });

})

// recherche des examens suivant le type : java .net (il manque le && pour choisir le niveau)
router.get('/niveau',function(req,res){
  var typeExam = req.query.niveau
  console.log(typeExam)
  examen.aggregate([ 
    { $match: { "niveau": typeExam
  }},
  ],
  
    function (err, reponses) {
      if (err) return res.status(404).send("no reponse found")
     else res.send(reponses);
  });

})

router.get('/niveauType',function(req,res){
  var niveau = req.query.niveau
  var typeExam = req.query.type
  console.log(niveau)
  console.log(typeExam)
  examen.find({"type":typeExam,"niveau":niveau},
    
    function (err, reponses) {
      if (err) return res.status(404).send("no evaluation reck found")
     else res.send(reponses);
  });

})

// get questions by id exams 
router.get('/question',function(req,res){
  var idExam = req.query.id 
  console.log(idExam)
  question.find({examen:idExam},
  
    function (err, reponses) {
      if (err) return res.status(404).send("no QUESTION found")
     else res.send(reponses);
  });

})

router.get('/inviteexam/:iduser/:idmeeting', function(req, res, next) {
  
  let ex = null
  let utilisateur = null
  
  
    user.findById(req.params.iduser,
    
      function (err, meetings) {
        if (err) return res.send(err)
       // res.send(meetings);
       utilisateur=meetings
       console.log(utilisateur)
    });
    
  
    examen.findById(req.params.idmeeting,
    
      function (err, meetings) {
        if (err) return res.send(err)
       // res.send(meetings);
        
        ex=meetings
       // console.log(meeting)
        const mailOptions = {
          from: 'dhiabsdl94@gmail.com', // sender address
          to: "oumayma.habouri@esprit.tn", // list of receivers
          subject: 'Invitation to evaluation test sended By be softylis : '+ex.title+' '+ex.type+' with duration of  '+ex.duree+' Min', // Subject line
          html: '<p> Please check this link to begin the exam  </p> <a href="http://localhost:3002/#/begin"> Click here to begin </a> <br> ' // plain text body
        };
      
         transporter.sendMail(mailOptions, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
       });
    });
    res.json('ok')
  
  
   
  
  
  
        
        
    });





  
module.exports=router; 