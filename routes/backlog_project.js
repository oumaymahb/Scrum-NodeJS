var express = require('express');
var router = express.Router();
var project=require('../models/project')
var mongoose = require('mongoose')
var backlog_projet = require('../models/backlog_projet');
var project_userstories=require('../models/project_userstories')
const cors = require('cors');
var app = express()

var Request = require("request")
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  router.put('/delete/:idB/:idU',(req,res)=>{
    let query= {"_id":req.params.idB}
    var ObjectId = require('mongoose').Types.ObjectId;
                backlog_projet.updateOne( 
                    { _id: query },
                    { $pull: { userstories : { _id : new ObjectId(req.params.idU.toString()) } } },
                    { safe: true },
                    function removeConnectionsCB(err, obj) {
                        res.header('Access-Control-Allow-Origin', '*')
                        res.status(200).json('deleted!')
                    });
            })
           
        
router.get("/getProject/:id",(req,res)=>{
    backlog_projet.findById(req.params.id, (err, backlog_projet ) => {
        if(!backlog_projet ){
            res.header('Access-Control-Allow-Origin', '*');
            res.status(404).json('backlog not found!')
        }
       else{
        project.findById(backlog_projet.project, (err, project ) => {
            if(!project ){
                res.header('Access-Control-Allow-Origin', '*');
                res.status(404).json('project not found!')
            }
            res.header('Access-Control-Allow-Origin', '*');
            res.status(200).json(project.id)
        })
       }
    })
})
router.put("/updateUserStory/:idB/:idU",(req,res)=>{
    let query= {"_id":req.params.idB}
    var ObjectId = require('mongoose').Types.ObjectId;
                backlog_projet.updateOne( 
                    {_id: query, userstories: { $elemMatch: { _id: new ObjectId(req.params.idU.toString())  } }
                    },
                    { $set: { "userstories.$.priority": req.body.priority } },
                    function removeConnectionsCB(err, obj) {
                        res.header('Access-Control-Allow-Origin', '*')
                        res.status(200).json('updated!')
                    });
            })
router.put("/addUserStory/:idB",(req,res)=>{
    var us=[]
    
    c=new project_userstories({
        
         userStory : req.body.userStory,
         priority : req.body.priority,
         timeestimation : req.body.timeestimation
     })
    b=new project_userstories({
    })
    Request.get({
        "headers": { "content-type": "application/json" },
        "url": "http://localhost:3000/backlogProject/getB/"+req.params.idB
       
    }, (error, response, body) => {
        if(error) {
           console.log(error)
        }
       
        b=response.body
        var obj = JSON.parse(b)
        us=obj.userstories
        us.push(c)
        console.log("aaaaaaaaaaa")
        console.log(us)
       
        backlog_projet.updateOne( 
            {_id: req.params.idB},
            { $set: { "userstories": us } },
            function removeConnectionsCB(err, obj) {
               
            });      
        
        res.status(200).json("ok")
    }); 
                        })
        
router.get("/getB/:id",(req,res)=>{
    backlog_projet.findById(req.params.id, (err, backlog_projet ) => {
        if(!backlog_projet ){
        res.status(404).json('backlog not found!')
        }                             
        res.status(200).json(backlog_projet)                    
        })
 })
router.get("/userstories/:id",(req,res)=>{
    backlog_projet.findById(req.params.id, (err, backlog_projet ) => {
        if(!backlog_projet ){
            res.status(404).json('backlog not found!')
        }
        
        res.status(200).json(backlog_projet.userstories)
     
    })
})
router.get("/userstories/:id",(req,res)=>{
    backlog_projet.findById(req.params.id, (err, backlog_projet ) => {
        if(!backlog_projet ){
            res.status(404).json('backlog not found!')
        }
        
        res.status(200).json(backlog_projet)
     
    })
})
router.post('/addBacklog/:project', (req,res)=> {
    b  = new  backlog_projet ({
        project : req.params.project,
        userstories : req.body.userstories
    });
    if(b.project===undefined)
    { 
        res.status(401).json('plz verify ')
        return
    }
    else{
        
        (b.userstories).forEach(element => {
            u =new project_userstories({
                userStory: element.userStory,
                priority: element.priority,
                timeestimation:element.timeestimation,
                backlog_projet:b.id
            })
            console.log("uuu"+u+"iiid"+b.id)
            u.save()
        });
        res.send(b)
        b.save()
    }
 
});
module.exports=router; 