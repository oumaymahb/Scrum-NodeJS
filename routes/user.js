var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user');
var jwt = require('jsonwebtoken')

router.get('/login', function(req, res, next) {
    res.render('user/login.twig');
  });


  router.get('/', function(req, res, next) {
    user.find()
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


router.post('/login', (req,res)=> {
    
  //  user.insertMany({firstName:"ddddd"});
    //console.log("hnhgn");

    let query = {"email":req.body.email};
    console.log(req.body.email)
    console.log(req.body.password)
    user.findOne(query,(err,user)=>{
       if(err){
            res.send(err);
        if(!user)
            res.status(401).json(user)
            console.log(user)
        }else{
            if(bcrypt.compareSync(req.body.password,user.password))
                {
                    console.log('user found',user)
                    var token = jwt.sign({email:user.email},'s3cr3t',{expiresIn:3600})
                    console.log('token'+token)
                    res.status(200).json({success:true,token:token})
                }
                else{
                    res.status(401).json('Unauthorised')
                }
              }
                    
            })

  
   
});

router.get('/register', function(req, res, next) {
    res.render('user/register.twig');
  });

router.post('/register',function(req,res){
     u  = new user({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        password : bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10)),
        email : req.body.email,
        username : req.body.username,
        role : req.body.role,
        telephone : req.body.telephone,
        image: req.body.image  
        
    });
    u.save(function(err,user){
        if (err) 
            res.send(err)
        else 
            res.send(user)
    }) 
    console.log(u)
  
})


router.get('/:id',function(req,res){

   // var now = new Date()
    let query = {
      "_id" : req.params.id
  }
  console.log('id'+req.params.id)
  user.findById(req.params.id,
    
    function (err, user) {
      if (err) return res.send(err)
      res.send(user);
  });
   })



module.exports = router