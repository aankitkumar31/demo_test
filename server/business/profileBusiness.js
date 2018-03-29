
var userModel = require('../models/userModel')
var async = require('async');
var DuplicateErr = require('../error/duplicateError');
const nodemailer = require('nodemailer');
const transporter = require('../config/mailConfig');
const clientUrl = require('../config/url').clientUrl
var ProfileBusiness = function(){

}

ProfileBusiness.prototype.create = async (doc,cb)=>{
    return new Promise((resolve,reject)=>{
        var entry = new userModel({
            fullName:doc.fullName,
            email:doc.email,
            Mobile: doc.mobile,
            password:doc.password
        })

        entry.save((err,data)=>{
            if(err){
                if(err instanceof DuplicateErr){
                    reject(err);
                    return;
                }
                reject(err);
            }
            resolve(data);
            
        })
    })
   
}

ProfileBusiness.prototype.setPasswordMail = async (doc,cb)=>{
    return new Promise((resolve,reject)=>{
        console.log(doc);
        
    })
}


ProfileBusiness.prototype.setPassword = async (doc,cb)=>{
    console.log("////setPassword//////")

    return new Promise((resolve,reject)=>{
        userModel.update({'_id':doc.userId},{'password':doc.password},function(err,doc){
            console.log(doc)
            if(err){
              console.log(err);
              reject(err);
              return
            }
            if(doc.n == 0){
              reject({message:"not found"})
              return
            }
            resolve({email:doc.email})
        })
    })
    
}    

ProfileBusiness.prototype.login = async (doc,cb)=>{
    console.log("////login//////")

    return new Promise((resolve,reject)=>{
        userModel.find({'email':doc.email,'password':doc.password},function(err,data){
            console.log(data)
            if(err){
                console.log(err);
                reject(err)
                return
            }
            if(data.length == 0){
                reject({message:"not found"})
                return
            }
        
           resolve({email:doc.email})
        
          })
    })
    
}    


module.exports = new ProfileBusiness;