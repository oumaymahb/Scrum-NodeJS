var jwt = require('jsonwebtoken')
module.exports.authenticate = function(req,res,next)
{
    var headerExists = req.headers.authorization; 
    if(headerExists){
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token,'s3cr3t',function(err,decoded){
            if(err) {
                console.log(err);
                res.status(401).json('unauthorized')
            }else{
                req.user = decoded.email;
                console.log(decoded.email);
                next() ; 
            }
        })
        }else{
            res.status(403).json('no web token provided')
        }
    }
