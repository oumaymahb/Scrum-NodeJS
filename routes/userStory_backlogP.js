var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var userstory=require('../models/project_userstories')
var backlog=require('../models/backlog_projet')
//update project
router.put("/update/:id",(req,res) => {
    userstory.findById(req.params.id, (err, userstory) => {

        if(err){
            console.log(err);
            return;
        }
        else{
        if(req.body.userStory) userstory.userStory = req.body.userStory
        if(req.body.priority) userstory.priority = req.body.priority
        if(req.body.timeestimation) userstory.timeestimation = req.body.timeestimation
        userstory.save()
        res.status(200).json(userstory)
        
    }
    }) 
})
//delete userstory
router.delete('/delete/:id',(req,res)=>{
    let query= {"_id":req.params.id};
    userstory.remove(query,(err)=>{
        if(err){
            res.status(401).json('user story not deleted')
            console.log(err);
           
            return;

        }
        else{
            backlog.findById(userstory.backlog_projet, (err, p ) => {
                if(!p ){
                    res.status(404).json('backlog not found!')
                }
               else{
                p.remove(query,(err)=>{
                            console.log("ppp"+p)
                            if(err){
                                res.status(401).json('user story not deleted')
                                console.log(err);
                                return;
                            }
                            else{
                                res.status(200).json('user story from backlog')
                                return;
                            }
                        });
                  
                    
             
               }
            })
           
            res.status(200).json('user story deleted')
            return;
        }
    });
    
});
module.exports = router;