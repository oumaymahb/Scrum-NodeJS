var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var project = require('../models/project');
var backlog_projet=require('../models/backlog_projet')
var issue = require('../models/issue')
var json2xls = require('json2xls')
var Request = require("request")
const cors = require('cors');
var app = express()
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var nodeMailer = require('nodemailer');
    var bodyParser = require('body-parser');
    var app = express();
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

var result2 = '';
app.use(json2xls.middleware);
var fs = require('fs');
router.get('/toExcel',function(req, res) {
 
res.status(200).json("ok")
});
//********get number not solved issue by project*****

  /* ******* not solved project ****** 
  router.get("/notsolved/:idP",(req, res) => {
    issue.countDocuments({status:"not solved","project":req.params.idP},(error, numOfDocs)=>{
        
        if(error)  
            console.log(error)

 
     console.log(numOfDocs)
       
    });
}) */
router.get("/maxIssues",(req, res) => {
    var date=req.query.createdDate+"T00:00:00.0Z"
    issue.aggregate(
        [
            {$match: {createdDate: {$gte: new Date(date)}}
            },
            {"$group" : 
        {_id:{createdBy:"$createdBy"}, 
        
         count:{$sum:1}}
	}, 
	{$sort:{"count":-1}}
        ],function(err, result) {
           
            res.json(result);
})


})
/* get the average solved time */
router.get("/avgSolvedTime",(req, res) => {
    issue.aggregate(
        [
            [{ $match :
                { status : "solved" } 
                },
                {
                  $group:
                    {
                      _id: null,
                      avgSolvedTime: { $avg: {$divide : [{$subtract: ["$solvedDate","$createdDate"]},86400000]}}
                  }
                }
              ]
        ],function(err, result) {
            /* divide the result by 1000 *60 *60 *24 */
          

console.log("aaaaaa")
var file = fs.createWriteStream('file.csv', {'flags': 'w+', autoClose: true});

for (var hashkey in result) {
    result2 += "Average solving time " + result[hashkey].avgSolvedTime + '\n';
    console.log(result2)
}
file.write(result2);

res.json(result);
})
})
    /*****************Get % of solved/not solved issues created on specific date**** */
router.get("/date",(req, res) => {

    var s="not solved"
   if (req.query.status=="solved" )
    s="solved"

   if (req.query.createdDate&&req.query.status){
        issue.countDocuments({createdDate:{'$eq':req.query.createdDate},status:s},(error, numOfDocs)=>{    
            if(error)  
                console.log(error)
                issue.countDocuments({createdDate:{'$eq':req.query.createdDate}},(error, allIssues)=>{    
                    if(error)  
                        console.log(error)
                        var file = fs.createWriteStream('file.csv', {'flags': 'w+', autoClose: true});
                                result2 += "Created issues number at " + new Date()+" "+(numOfDocs*100/allIssues) + '\n';
                                console.log(result2)
                            file.write(result2);
                            res.header('Access-Control-Allow-Origin', '*')
                        res.json(numOfDocs)
                }) 
   
          }) 
    } 
    else if (req.query.createdDate&&req.query.status==undefined){
        issue.countDocuments({createdDate:{'$eq':req.query.createdDate}},(error, numOfDocs)=>{    
            if(error)  
                console.log(error)
                issue.countDocuments({createdDate:{'$eq':req.query.createdDate}},(error, allIssues)=>{    
                    if(error)  
                        console.log(error)
                        var file = fs.createWriteStream('file.csv', {'flags': 'w+', autoClose: true});
                                result2 += "Created issues number at " + new Date()+" "+(numOfDocs*100/allIssues) + '\n';
                                console.log(result2)
                            file.write(result2);
                            res.header('Access-Control-Allow-Origin', '*')
                        res.json(numOfDocs)
                }) 
   
          }) 
    } 
    else
    res.json("please enter a date")

})
    
 /*****************Get number of issues of  **** */
router.get("/",(req, res) => {
    /*****************Get issues of userstories **** */
    if (req.query.idU && req.query.idP==undefined && req.query.release==undefined){
        issue.countDocuments({userstory:req.query.idU,status:req.query.status},(error, numOfDocs)=>{    
            if(error)  
                console.log(error)
                var file = fs.createWriteStream('file.csv', {'flags': 'w+', autoClose: true});
                                result2 += "number issues  "+  (numOfDocs) + '\n';
                                console.log(result2)
                            file.write(result2);
                            res.header('Access-Control-Allow-Origin', '*');
                res.status(200).json(numOfDocs)
        
        })
    }
    /*****************Get issues of project **** */
    else if (req.query.idP && req.query.idU==undefined && req.query.release==undefined){
        issue.countDocuments({project:req.query.idP,status:req.query.status},(error, numOfDocs)=>{    
            if(error)  
                console.log(error)
                var file = fs.createWriteStream('file.csv', {'flags': 'w+', autoClose: true});
                                result2 += "number issues  " + (numOfDocs) + '\n';
                                console.log(result2)
                            file.write(result2);
                            res.header('Access-Control-Allow-Origin', '*');
        res.status(200).json(numOfDocs)
        
        })
    }
    /*****************Get issues of release **** */
    else if (req.query.idR && req.query.idU==undefined && req.query.idP==undefined){
    issue.countDocuments({release:req.query.idR,status:req.query.status},(error, numOfDocs)=>{    
        if(error)  
            console.log(error)
            var file = fs.createWriteStream('file.csv', {'flags': 'w+', autoClose: true});
                                result2 += "number issues  " + (numOfDocs) + '\n';
                                console.log(result2)
                            file.write(result2);
                            res.header('Access-Control-Allow-Origin', '*');
            res.status(200).json(numOfDocs)
    
    }) }
    /*****************Get issues by status **** */
    else {
        issue.countDocuments({status:req.query.status},(error, numOfDocs)=>{    
            if(error)  
                console.log(error)
                var file = fs.createWriteStream('file.csv', {'flags': 'w+', autoClose: true});
                                result2 += "number of all issues  " + (numOfDocs) + '\n';
                                console.log(result2)
                            file.write(result2);
                            res.header('Access-Control-Allow-Origin', '*');
                res.status(200).json(numOfDocs)
        
        })
    }
})
//********get number solved issue by project********

//********get issue by id*****
router.get("/:id",(req,res)=>{
    issue.findById(req.params.id, (err, issue) => {
        if(!issue){
            res.status(404).json('issue not found!')
        }
        res.status(200).json(issue)
    })
})
router.get("/release/:id",(req,res)=>{
    issue.find({"release":req.params.id}, (err, issues) => {
        if(!issues){
            res.status(404).json('this release doesn"t have issues')
        }
        res.status(200).json(issues)
    })
})
router.get("/project/:id",(req,res)=>{
    issue.find({"project":req.params.id}, (err, issues) => {
        if(!issues){
            res.status(404).json('this project doesn"t have issues')
        }
        res.status(200).json(issues)
    })
})
router.post('/add/:id', (req,res)=> {
    var p=0
    Request.get({
        "headers": { "content-type": "application/json" },
        "url": "http://127.0.0.1:5000/predict?ch="+req.query.ch,
        
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        i  = new issue ({
            title : req.body.title,
            type:req.body.type,
            createdDate : req.body.createdDate,
            solvedDate : req.body.solvedDate,
            description : req.body.description,
            priority:response.body,
            status: req.body.status,
            createdBy:req.params.id,
            userstory:req.body.userstory,
            release:req.body.release,
            project:req.body.project,
            language:req.body.language
        }) 
        i.save()
        res.status(200).json(i)
        console.log(response.body)
    })
    let transporter = nodeMailer.createTransport({ 
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: '',
            pass: ''
        }
    });
    let mailOptions = {
        from: '', // sender address
        to: "", // list of receivers
        subject: "New Issue has been created ", // Subject line
        text: "", // plain text body
        html: '<b>New Issue has been created on SCRUM Platform related to a project. please verifiy it.</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        });
          
        })
module.exports = router;