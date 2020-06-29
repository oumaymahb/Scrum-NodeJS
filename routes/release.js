var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var release = require('../models/releases');
var project = require('../models/project');

router.get("/:id",(req,res)=>{
    release.findById(req.params.id, (err, release ) => {
        if(!release ){
            res.status(404).json('release not found!')
        }
        res.json(release)
    })
})
router.get("/",(req,res)=>{
    release.find({}, (err, releases ) => {
        if(!releases ){
            res.status(404).json('release not found!')
        }
        res.json(releases)
    })
})

router.post('/addRelease/:id', (req,res)=> {
    r  = new release ({
        title:req.body.title,
        goals : req.body.goals,
        status : req.body.status,
        startingDate : req.body.startingDate,
        releaseDate : req.body.releaseDate,
        numberSprint : req.body.numberSprint,
        project : req.params.id,
        sprints: req.body.sprints,
        userstories:req.body.userstories
    });
   
        project.findById(r.project._id, (err, project) => {
            console.log("iddddddd"+r.project._id)
            if(!project){
                res.status(404).json('Project not found!')
            }
           project.releases.push(r)
           project.save()
           res.send(r)
        r.save()
        })
 
        
 
});
router.put("/update/:id",(req,res) => {
    release.findById(req.params.id, (err, release) => {
        
        if(err){
            console.log(err);
            return;
        }
        else{
            if(req.body.numberSprint) release.numberSprint=req.body.numberSprint
            if(req.body.goals) release.goals = req.body.goals
            if(req.body.status) release.status = req.body.status
            if(req.body.startingDate) release.startingDate = req.body.startingDate
            if(req.body.releaseDate) release.releaseDate = req.body.releaseDate
            if(req.body.project) release.releaseDate = req.body.project
            if(req.body.userstories) project.description = req.body.userstories
            if(req.body.sprints) project.description = req.body.sprints
        release.save()
        res.status(200).json(release)
        
    }
    }) 
})
router.delete('/delete/:id',(req,res)=>{
    let query= {"_id":req.params.id};
    release.remove(query,(err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            res.status(200).json('release deleted')
            return;
        }
    });
});
module.exports = router;