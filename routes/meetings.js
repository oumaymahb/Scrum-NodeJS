var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var meetings = require('../models/meetings')
var cors = require('cors');
var cron = require('node-cron');
var user = require('../models/user');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'dhiabsdl94@gmail.com',
         pass: 'D58059894'
     }
 });



 cron.schedule('* * * * *', () => {
    console.log('running a task meeting every minute');
    var now = new Date()
    meetings.find()
        .then((data)=>{
            
           // res.setHeader("Access-Control-Allow-Origin", "*"),
           // res.statusCode=200,
            //res.contentType('application/json'),
           // console.log(data)
  
            data.forEach(element => {
              element.devTeam.forEach(element1 => {
           //     console.log(element1)
          
              
              user.findById(element1,
                
                function (err, user) {
               //  console.log('user');
              //    console.log(user);
                 
                  console.log(element.date.getDate()==now.getDate());
                  //uncomment to send mail o 
     /*      if(user!=null && element.date.getDate() ==now.getDate()){
                   const mailOptions = {
                      from: 'dhiabsdl94@gmail.com', // sender address
                      to: user.email, // list of receivers
                      subject: 'Subject of your email', // Subject line
                      html: '<p> dont forget the meeting today at '+element.startDate+ '</p>'// plain text body
                    };
    
                     transporter.sendMail(mailOptions, function (err, info) {
                      if(err)
                        console.log(err)
                      else
                        console.log(info);
                   });
                   
           }*/
                });
              });
  
           //   console.log('element'); 
           //   console.log(element);
  
            });
        })
        
  
  });
  
  
  /* GET users listing. */
  
  
  
  
  router.get('/', function(req, res, next) {
    var users = null ; 
    meetings.find()
        .then((data)=>{
           // res.setHeader("Access-Control-Allow-Origin", "*"),
           // res.statusCode=200,
            //res.contentType('application/json'),
            res.json(data)
        })
        
        
    });
  
    router.get('/passe', function(req, res, next) {
      var users = null ;
      var now = new Date() 
      meetings.find()
          .then((data)=>{
             // res.setHeader("Access-Control-Allow-Origin", "*"),
             // res.statusCode=200,
              //res.contentType('application/json'),
             // res.json(data)
             let passe = [] 
             data.forEach(element => {
               if(element.date<now){
                    passe.push(element)
               }
             });
             res.json(passe)
          })
          
          
      });
  
      router.get('/Futur', function(req, res, next) {
        var users = null ;
        var now = new Date() 
        meetings.find()
            .then((data)=>{
               // res.setHeader("Access-Control-Allow-Origin", "*"),
               // res.statusCode=200,
                //res.contentType('application/json'),
               // res.json(data)
               let passe = [] 
               data.forEach(element => {
                 if(element.date>now){
                      passe.push(element)
                 }
               });
               res.json(passe)
            })
            
            
        });
  
        router.get('/now', function(req, res, next) {
          var users = null ;
          var now = new Date() 
          meetings.find()
              .then((data)=>{
                 // res.setHeader("Access-Control-Allow-Origin", "*"),
                 // res.statusCode=200,
                  //res.contentType('application/json'),
                 // res.json(data)
                 let passe = [] 
                 data.forEach(element => {
                   if(element.date.getTime()===now.getTime()){
                        passe.push(element)
                   }
                 });
                 res.json(passe)
              })
              
              
          });
  
    router.post('/addMeeting',function(req,res){
  
      var now = new Date()
      //date of now dont forget to change
      m  = new meetings({
        title : req.body.title,
        type : req.body.type,
        date : req.body.date,
        startDate :req.body.startDate,
        duree:req.body.duree,
        feedback : " ",
        scrumMaster : '5c9237c4b6a67519a009c48f',
        devTeam : req.body.devTeam,
    
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
  meetings.findByIdAndUpdate(req.params.id, {$set: req.body},
    
    function (err, meetings) {
      if (err) return res.send(err)
      res.send('meeting udpated.');
  });
  
  })
  
  
  router.delete('/delete/:id', function(req, res, next) {
    let query = {
        "_id" : req.params.id
    }
    //console.log(query)
    meetings.remove(query,(err)=>{
        if(err) {
            console.log('error supression');
            return;
        } 
        else{
          res.send('meeting udpated.');
        }
    });
  
  });
  
   
  router.get('/id/:id',function(req,res){
  
    var now = new Date()
    let query = {
      "_id" : req.params.id
  }
  console.log('id'+req.params.id)
  meetings.findById(req.params.id,
    
    function (err, meetings) {
      if (err) return res.send(err)
      res.send(meetings);
  });
  
  })
  
  router.put('/addFeedBack/:id',function(req,res){
  console.log('add feedback')
    var now = new Date()
    let query = {
      "_id" : req.params.id
  }
  console.log('id'+req.params.id)
  meetings.findByIdAndUpdate(req.params.id, {$set: req.body},
    
    function (err, meetings) {
      if (err) return res.send(err)
      res.send('meeting udpated.');
  });
  })
  
  router.get('/inviteUser/:iduser/:idmeeting', function(req, res, next) {
    
  let meeting = null
  let utilisateur = null
  
  
    user.findById(req.params.iduser,
    
      function (err, meetings) {
        if (err) return res.send(err)
       // res.send(meetings);
       utilisateur=meetings
       console.log(utilisateur)
    });
    
  
    meetings.findById(req.params.idmeeting,
    
      function (err, meetings) {
        if (err) return res.send(err)
       // res.send(meetings);
        
        meeting=meetings
        console.log(meeting)
        const mailOptions = {
          from: 'dhiabsdl94@gmail.com', // sender address
          to: "oumayma.habouri@esprit.tn", // list of receivers
          subject: 'Invitation Au meeting '+meeting.title+' prévu le '+meeting.date+' à '+meeting.startDate, // Subject line
          html: '<p> Please check this link to connect to our  </p> <a href="http://localhost:3000"> This is the link to the Chat App of Be softilys </a> <br> *Nb : It so important to be present 5min before th meeting you have to connect with your BeSoftilis username <br> and join room Named :'+meeting.title +' !!! ...  '// plain text body
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
  
    
  
router.post('/add', (req, res) => {



    meetings.insertMany(req.body);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.body));

});
router.post('/absenceByUser/:param',cors(), (req, res) => {

    let test= req.body.meetings;
    let query = {"_id":{ $in:  test  }};
    meetings.find(query,(err,data)=>{
        if(err){
            //  console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ err }));
            return;
        }else{
            //  res.render('index.twig',{data:data});
            presence = 0;
            data.forEach(function(element) {
               element.DevTeamMember.forEach(function(elt) {

                   if(elt.toString() === req.params.param.toString()){
                       presence++;
                   }
                   }

               );







            });

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ presence }));
        }
    })

});
module.exports=router; 