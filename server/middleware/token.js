
var userModel = require('../models/userModel')
var jwt  = require('jsonwebtoken');

var token = function(){

}

token.prototype.fileToken = function(req,res,next){
    console.log("in token")

    if(req.body.email!=undefined){
        userModel.find({'email':req.body.email},function(err,doc){
            if(err){
                res.status(404).send({message:err})
                return;
            }
            console.log(doc)
            if(doc.length==0){
                res.status(404).send({message:"userDoesNotExist"})
                return;
            }
                req.body.userId = doc[0]._id;
                req.body.email = doc[0].email;
                next();
                
        })
        return;
    }
    res.status(404).send({message:"error"})
   
}

token.prototype.Token = function(req,res,next){
    console.log("in Token")
    console.log(req.headers)
    if(req.headers.email!=undefined){
        userModel.find({'email':req.headers.email},function(err,doc){
            if(err){
                res.status(404).send({message:err})
                return;
            }
            console.log(doc)
            if(doc.length==0){
                res.status(404).send({message:"userDoesNotExist"})
                return;
            }
                req.body.userId = doc[0]._id;
                req.body.email = doc[0].email;
                next();
                
        })
        return;
    }
    res.status(404).send({message:"error"})
   
}


token.prototype.guestLoginToken = function(req,res,next){
    jwt.verify(req.body.token,process.env.SECRET,(err,result)=>{
        console.log(result);
        if(result.password==''){
            guestModel.find({'guestEmail':result.guestEmail},function(err,data){
                if(err){
                    res.status(404).send(err);
                    return
                }
                res.status(200).send(data)
                return
            })
        }
        console.log("result");
        req.body.guestEmail = result.guestEmail;
        req.body.password   = result.password
        next();    
    })
   
}

token.prototype.guestToken = function(req,res,next){
    console.log("guesttoken");
    if(req.headers.guestemail!=undefined){
        guestModel.find({'guestEmail':req.headers.guestemail},function(err,doc){
            if(err){
                res.status(404).send({message:err})
                return;
            }
            console.log(doc)
            if(doc.length==0){
                res.status(404).send({message:"userDoesNotExist"})
                return;
            }   
                req.body.guestId = doc[0]._id;
                req.body.guestEmail = doc[0].guestEmail;
                next();
                
        })
        return;
    }
    res.status(404).send({message:"error"})
   
}
module.exports = new token;