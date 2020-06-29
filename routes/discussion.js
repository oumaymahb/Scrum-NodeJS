var express = require('express');
var router = express.Router();
var socket = require('socket.io');
var msg = require('../models/messages')
var discussion = require('../models/discussion')
var app = express();

var server = app.listen(4000, function(){
  console.log('listening for requests on port 3000,');
});

app.use(express.static('public'));

/* GET users listing. */
router.get('/', function(req, res, next) {
  
    res.render('chat/discussion.twig');
  });


  // Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
         console.log(data);
        io.sockets.emit('chat', data);


        //add in the database
        var now = new Date()
        m  = new msg({
          contenu : data.message,
          date : now,
       });
       m.save(function(err,user){
           if (err) 
             console.log(err)
           else 
              console.log(user)
       }) 

        console.log(data)
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});

router.post('/add',function(req,res){
  var now = new Date()
  m  = new discussion({
    title : req.body.title,
    startDate : now, 
    meeting : req.body.meeting,
    user : req.body.user
 });
 m.save(function(err,dis){
     if (err) 
         res.send(err)
     else 
         res.send(dis)
 }) 
 console.log(m)

})



router.get('/idmeeting/:id',function(req,res){

  var now = new Date()
  let query = {
    "_id" : req.params.id
}
console.log('id'+req.params.id)
discussion.find({meeting:req.params.id},
  
  function (err, msgs) {
    if (err) return res.send(err)
    res.send(msgs);
});

})

router.get('/iduser/:id',function(req,res){

  var now = new Date()
  let query = {
    "_id" : req.params.id
}
console.log('id'+req.params.id)
discussion.find({user:req.params.id},
  
  function (err, msgs) {
    if (err) return res.send(err)
    res.send(msgs);
});

})


  


module.exports=router; 

