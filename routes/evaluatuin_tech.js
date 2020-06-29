var express = require('express');
var router = express.Router();
var evaluationTeck = require('../models/evaluationTeck')
var examen = require('../models/exam')
var user = require('../models/user')
var cron = require('node-cron');
var nodemailer = require('nodemailer');
var _ = require('lodash');
var serializer=require('./serlizer');
var brain= require('brain.js')



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'dhiabsdl94@gmail.com',
         pass: 'D58059894'
     }
 });





 


cron.schedule('* * * * *', () => {
  console.log('running a task evaluation every minute');
  let list= [] 
  let ListEvA = []
  let ListEvB = []
  let ListEvC = []
  let ListUserA = [] 
  let ListUserB = [] 
  let ListUserC = []
  var exam ; 
  evaluationTeck.find({},
    
    function (err, ev) {
      if (err) return res.status(404).send("no evaluation reck found")
     else {
       ev.forEach(element => {
         if(element.note<=13 && element.note>11 && element.verfied==false)
         {
          ListEvA.push(element)
         }
         else if(element.note<11 && element.note>8 && element.verfied==false )
         {
          ListEvB.push(element)
         }
         else if(element.note<8 && element.verfied==false){
          ListEvC.push(element)
         }
       
       });
     //  console.log("ListEvA")
      // console.log(ListEvA)

      
//send mail code 
     
      


      ListEvA.forEach(element => {
        
        // fonction du mail pour envoyer l'examen du type A
        user.findById(element.user,
    
          function (err, user) {
            //if (err) return res.send(err)
            ListUserA.push(user);
           // console.log(' element user')
            //console.log(element.user)
            console.log('listUser qui doivent passer lexamen A')
            console.log(ListUserA)

            ListEvA.forEach(element => {
              if(element.verfied==false){
              let query = {"type":element.type,"niveau" : "A"};
              console.log("******************************** examen A")
            // console.log(element.type)
              examen.findOne(query,
    
              function (err, reponses) {
                  exam = reponses
                  
                 console.log(exam)
                 // ici on doit point sur le tableau dev au lieu 

                 // envoyer le lien de l'examen 
    /*          const mailOptions = {
                  from: 'dhiabsdl94@gmail.com', // sender address
                  to: 'dhiaeddine.boussandel@esprit.tn', // list of receivers
                  subject: 'Subject of your email', // Subject line
                  html: '<a href="http://localhost:3001/#/begin "> Click here to begin yourr exam </a>'// plain text body
                };

                 transporter.sendMail(mailOptions, function (err, info) {
                  if(err)
                    console.log(err)
                  else
                    console.log(info);
               });
               */
               

               // now update the database make true = verified

             

            });
            
          console.log('id'+element._id)
          evaluationTeck.findByIdAndUpdate(element._id, {$set: {verfied : true}},
            
            function (err, meetings) {
              //if (err) return res.send(err)
             // res.send('cron evaluation udpated.');
             console.log('cron update ecaluation of type A')
           //  console.log(ListEvC);
          });
          }


            
            });

            ///l'examen au mail pour ceux get exam with type et niveau 
            //mise a jour verified 


        });

        

        // get the exam 
      });

      ListEvB.forEach(element => {
        // fonction du mail pour envoyer l'examen du type A
        user.findById(element.user,
    
          function (err, user) {
            //if (err) return res.send(err)
            ListUserB.push(user);
           // console.log(' element user')
            //console.log(element.user)
            console.log('listUser qui doivent passer lexamen B')
            console.log(ListUserB)
            ListEvB.forEach(element => {
              if(element.verfied==false){
              let query = {"type":element.type,"niveau" : "B"};
              console.log("******************************** examen b")
            // console.log(element.type)
              examen.findOne(query,
    
              function (err, reponses) {
                  exam = reponses
                  
                 console.log(exam)
                 // ici on doit point sur le tableau dev au lieu 

                 // envoyer le lien de l'examen 
        /*        const mailOptions = {
                  from: 'dhiabsdl94@gmail.com', // sender address
                  to: 'dhiaeddine.boussandel@esprit.tn', // list of receivers
                  subject: 'Subject of your email', // Subject line
                  html: '<a href="http://localhost:3001/#/begin"> Click here to begin yourr exam </a>'// plain text body
                };

                 transporter.sendMail(mailOptions, function (err, info) {
                  if(err)
                    console.log(err)
                  else
                    console.log(info);
               });
               */

               // now update the database make true = verified

             

            });
            
          console.log('id'+element._id)
          evaluationTeck.findByIdAndUpdate(element._id, {$set: {verfied : true}},
            
            function (err, meetings) {
              //if (err) return res.send(err)
             // res.send('cron evaluation udpated.');
             console.log('cron update ecaluation of type b')
           //  console.log(ListEvC);
          });
          }


            
            });

            
        });

        

        // get the exam 
      });


      ListEvC.forEach(element => {
        // fonction du mail pour envoyer l'examen du type A
        user.findById(element.user,
    
          function (err, user) {
            //if (err) return res.send(err)
            ListUserC.push(user);
           // console.log(' element user')
            //console.log(element.user)
            console.log('listUser qui doivent passer lexamen C')
            console.log(ListUserC)
            
            ListEvC.forEach(element => {
              if(element.verfied==false){
              let query = {"type":element.type,"niveau" : "C"};
              console.log("******************************** examen c")
            // console.log(element.type)
              examen.findOne(query,
    
              function (err, reponses) {
                  exam = reponses
                  
                 console.log(exam)
                 // ici on doit point sur le tableau dev au lieu 

                 // envoyer le lien de l'examen 
         /*       const mailOptions = {
                  from: 'dhiabsdl94@gmail.com', // sender address
                  to: 'dhiaeddine.boussandel@esprit.tn', // list of receivers
                  subject: 'Subject of your email', // Subject line
                  html: '<a href="http://localhost:3001/#/begin"> Click here to begin yourr exam </a>'// plain text body
                };

                 transporter.sendMail(mailOptions, function (err, info) {
                  if(err)
                    console.log(err)
                  else
                    console.log(info);
               });
               */

               // now update the database make true = verified

             

            });
            
          console.log('id'+element._id)
          evaluationTeck.findByIdAndUpdate(element._id, {$set: {verfied : true}},
            
            function (err, meetings) {
              //if (err) return res.send(err)
             // res.send('cron evaluation udpated.');
             console.log('cron update ecaluation of type c')
           //  console.log(ListEvC);
          });
          }


            
            });
          

        });

        

        // get the exam 
      });

     
    
  /*    console.log('listUser B')
      console.log(ListUserB)
      console.log('listUser A')
      console.log(ListUserA)
      console.log('listUser C')
      console.log(ListUserC)
      */
    //send mail email 
   /*   
   transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
     */

   

       
     }
    });

});

cron.schedule('0 9 * * *', () => {
  console.log('running a task every day at 09 am ');

evaluationTeck.find()
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
         console.log(data)
      })
      .catch((err)=> {
          console.log('erreur');
      })
});




/* GET eva listing. */
router.get('/', function(req, res, next) {
  //var users = null ; 
  evaluationTeck.find()
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
    m  = new evaluationTeck({
      title : req.body.title,
      type : req.body.type,
      date : now,
      verfied : false,
      note:req.body.note,
      examen : req.body.examen,
      user : req.body.user
   });
   m.save(function(err,evaluationTeck){
       if (err) 
           res.send(err)
       else 
           res.send(evaluationTeck)
   }) 
   console.log(m)
 
})

  router.get('/user',function(req,res){
    let idUser = req.query.iduser 
    console.log(idUser)
    evaluationTeck.find({user:idUser},
    
      function (err, reponses) {
        if (err) return res.status(404).send("no evaluation reck found")
       else res.send(reponses);
    });
  
  })

// calculer score et sum d'un user donne
  router.get('/avg',function(req,res){
   // let typeExam = req.query.type
    let idUser = req.query.iduser
    let sum = 0 ;
    let avg = 0 ; 
    let list  = [];
   // console.log(typeExam)
   
   evaluationTeck.find({user:idUser},{},
    
    function (err, reponses) {
      
      reponses.forEach(element => {
      /*  if(element.type ===typeExam)
         {
           list.push(element)
          }
          */
         sum = sum + element.note
         avg = sum / reponses.length
        console.log(avg)
      });
    
      if (err) return res.status(404).send("no evaluation reck found")
     else res.json(
       {
       "avg_totale " : avg , 
       "Sum " : sum
      });
  });

  })

// calculer score  d'un user donné et dans un examen donnée soit java / .Net
  router.get('/avgType',function(req,res){
     let typeExam = req.query.type
     let idUser = req.query.iduser
     let sum = 0 ;
     let avg = 0 ; 
     let count = 0 ;
     let list  = [];
     console.log(typeExam)
    
    evaluationTeck.find({user:idUser},{},
     
     function (err, reponses) {
       
       reponses.forEach(element => {
        console.log(" type"+element.type)
        console.log("element type"+element.type)
         if(element.type ==typeExam)
          {
            count = count +1 
            sum = sum + element.note
            avg = sum / count
           }
           
          
         console.log(avg)
       });
     
       if (err) return res.status(404).send("no evaluation"+ typeExam +  " reck found pour le user " + idUser)
      else res.json(
        
        avg 
       
        

       );
   });
 
   })


   router.get('/meilleurMoyenne',function(req,res){
    let typeExam = req.query.type
    let idUser = req.query.iduser
    let sum = 0 ;
    let avg = 0 ; 
    let avgMeilleur = 0 ; 
    let count = 0 ;
    let meilleur ; 
    let list  = [];
    console.log(typeExam)
   
   evaluationTeck.find({user:idUser},{},
    
    function (err, reponses) {
      
      reponses.forEach(element => {
       console.log(" type"+element.type)
       console.log("element type"+element.type)
       // if(element.type ==typeExam)
      //   {
           count = count +1 
           sum = sum + element.note
           avg = sum / count
           
           if(avg > avgMeilleur){
             avgMeilleur = avg ; 
             meilleur = element
           }
        //  }
          
         
        console.log("meilleur avg :"+avgMeilleur)
        console.log("meilleur :"+meilleur)
      });
    
      if (err) return res.status(404).send("no evaluation"+ typeExam +  " reck found pour le user " + idUser)
     else res.json(
       
       meilleur  
       

      );
  });

  })


  router.get('/meilleurMoyenneType',function(req,res){
    let typeExam = req.query.type
    let idUser = req.query.iduser
    let sum = 0 ;
    let avg = 0 ; 
    let avgMeilleur = 0 ; 
    let count = 0 ;
    let meilleur ; 
    let list  = [];
    console.log(typeExam)
   
   evaluationTeck.find({user:idUser},{},
    
    function (err, reponses) {
      
      reponses.forEach(element => {
       console.log(" type"+element.type)
       console.log("element type"+element.type)
        if(element.type ==typeExam)
         {
           count = count +1 
           sum = sum + element.note
           avg = sum / count
           
           if(avg > avgMeilleur){
             avgMeilleur = avg ; 
             meilleur = element
           }
          }
          
         
        console.log("meilleur avg :"+avgMeilleur)
        console.log("meilleur :"+meilleur)
      });
    
      if (err) return res.status(404).send("no evaluation"+ typeExam +  " reck found pour le user " + idUser)
     else res.json(
       
       meilleur 
       );
  });

  })


  router.get('/min',function(req,res){
    let typeExam = req.query.type
    let idUser = req.query.iduser
    let sum = 0 ;
    let avg = 0 ; 
    let avgMauvais = 100 ; 
    let count = 0 ;
    let mauvais ; 
    let list  = [];
    console.log(typeExam)
   
   evaluationTeck.find({user:idUser},{},
    
    function (err, reponses) {
      
      reponses.forEach(element => {
       console.log(" type"+element.type)
       console.log("element type"+element.type)
     //   if(element.type ==typeExam)
      //   {
       // avgMauvais = Math.max(reponses.note)
           count = count +1 
           sum = sum + element.note
           avg = sum / count
           
           if(avg < avgMauvais){
            avgMauvais = avg ; 
             mauvais = element
           }
       //   }
          
         
        console.log("mauvaus avg :"+avgMauvais)
        console.log("mauvais elment :"+mauvais)
      });
    
      if (err) return res.status(404).send("no evaluation"+ typeExam +  " reck found pour le user " + idUser)
     else res.json(
       {
       "min_evaluation " : mauvais , 
       "avg " : avgMauvais,

      });
  });

  })


  router.get('/minType',function(req,res){
    let typeExam = req.query.type
    let idUser = req.query.iduser
    let sum = 0 ;
    let avg = 0 ; 
    let avgMauvais = 100 ; 
    let count = 0 ;
    let mauvais ; 
    let list  = [];
    console.log(typeExam)
   
   evaluationTeck.find({user:idUser},{},
    
    function (err, reponses) {
      if(reponses.length!=0){
      reponses.forEach(element => {
       console.log(" type"+element.type)
       console.log("element type"+element.type)
       if(element.type ==typeExam)
       {
        //avgMauvais = Math.max(reponses.note)
           count = count +1 
           sum = sum + element.note
           avg = sum / count
           
           if(avg < avgMauvais){
            avgMauvais = avg ; 
             mauvais = element
           }
          }
          
         
        console.log("mauvaus avg :"+avgMauvais)
        console.log("mauvais elment :"+mauvais)
      }

      
      );
    
      if ((err)) return res.status(404).send("no evaluation"+ typeExam +  " reck found pour le user " + idUser)
     else res.json(
       
        mauvais 
      

      );
  }});

  })


  
  router.get('/machine',function(req,res){
    evaluationTeck.find()
    .then((trainData)=>{
       // res.setHeader("Access-Control-Allow-Origin", "*"),
       // res.statusCode=200,
        //res.contentType('application/json'),
       console.log(trainData)
    })
    .catch((err)=> {
        console.log('erreur');
    })

    
 var net = new brain.NeuralNetwork();
  	trainData = [
      {
        input: 'No recommendation ',
        output: { '1': 1 }
      },
      {
        input: 'No recommendation ',
        output: { '2': 1 }
      },
      {
        input: 'recommendation for java project',
        output: { '3': 1 }
      }, {
        input: 'recommendation for java project',
        output: { '3': 1 }
      }
    ];
    net.train(serializer.serialize(trainData), { log: true });
  
    var output = net.run(serializer.encode("java react interface login register"));
   res.json(Devid(output))

  });
  function Devid(result) {
    let highestValue = 0;
    let highestDeveloper = '';
    for (let Devid in result) {
      if (result[Devid] > highestValue) {
        highestValue = result[Devid];
        highestDeveloper = Devid;
      }
    }
  
    return highestDeveloper;
  } 

  router.get('/sendevaluation/note/:note', function(req, res, next) {
    //var users = null ; 
            var now = new Date()
            let query = {
            "_id" : req.params.id
        }
        let note=req.params.note
        let countMin=0;
        let count = 0 ; 
        let pourcentageMin = 0;
           console.log('note:'+req.params.note)

           evaluationTeck.find()
           .then((data)=>{
              // res.setHeader("Access-Control-Allow-Origin", "*"),
              // res.statusCode=200,
               //res.contentType('application/json'),
               count = data.length
               data.forEach(element => {
                 if(element.note<note){
                  countMin++
                 }
                  });

               pourcentageMin=(countMin*100)/count
               console.log('pourcentage Min:'+pourcentageMin)

               const mailOptions = {
                from: 'dhiabsdl94@gmail.com', // sender address
                to: 'dhiaeddine.boussandel@esprit.tn', // list of receivers
                subject: 'Resultas Of evaluation passed:'+now, // Subject line
                html: '<p> Note: '+ note+' </p> <br> <p> Note: '+ note+' you had better than '+pourcentageMin.toFixed(2)+'% who passed this exam.</p> ' // plain text body
              };
              
         transporter.sendMail(mailOptions, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
       });
              res.json('evaluation sent')
           })
           
           
       
        
    });

    



module.exports=router; 
