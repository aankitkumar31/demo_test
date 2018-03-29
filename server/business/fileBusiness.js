
var fileModel = require('../models/fileModel')
var async = require('async');
var DuplicateErr = require('../error/duplicateError');
const nodemailer = require('nodemailer');
const transporter = require('../config/mailConfig');
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var s3 = new AWS.S3();
var FileBusiness = function(){

}

FileBusiness.prototype.uploadFileS3 = async (doc,cb)=>{
    return new Promise((resolve,reject)=>{
        console.log(doc);
        sampleFile = doc.avatar
        var bucketName = 'node-sdk-sample-' + uuid.v4();
        var keyName = sampleFile.name
        console.log("in bucket")

           
          var params = {Bucket: 'primesharebucket', Key: keyName, Body: sampleFile.data};
          s3.putObject(params, function(err, data) {
            if (err)
                reject(err)
            else
                resolve(data)
          });
     
    })
   
}

FileBusiness.prototype.fileUploadDatabase = async (doc,cb)=>{
    return new Promise((resolve,reject)=>{
        console.log(doc.body);
        var file = doc.files.avatar;
        console.log(file);
        var entry = new fileModel({
            name:file.name,
            path:`https://s3.amazonaws.com/primesharebucket/${file.name}`,
            userId:doc.body.userId
            // userId: doc.,
        })
        entry.save(function(err,result){
            if(err){
                rejecet(err);
            }
            resolve(result);
        })
    })
   
}

FileBusiness.prototype.getAllFilesS3 = async (doc,cb)=>{
    return new Promise((resolve,reject)=>{
        console.log("allFilesForUser")
        console.log(doc)
        fileModel.find({'userId':doc.userId},function(err,data){
            if(err){
                reject(err);
                return;
            }   
                resolve(data);
        })
    })
   
}


module.exports = new FileBusiness;