var FileBusiness = require('../business/fileBusiness')
var fileModel = require('../models/fileModel')
var async = require('async');
var DuplicateErr = require('../error/duplicateError')
const nodemailer = require('nodemailer');
const transporter = require('../config/mailConfig');
var jwt = require('jsonwebtoken');
var fs = require('fs')
var bcrypt = require('bcryptjs');
var serverUrl = require('../config/url').serverUrl

var File = function(){

}

File.prototype.upload = async function (req, res) {
    try {
        console.log(req.files);

        let sampleFile = req.files.avatar;
        console.log(req.body)
        console.log(sampleFile)
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(`uploads/${sampleFile.name}`, function (err) {
            console.log("jfdlskldsk")
            if (err) {
                console.log(err);
                res.status(500).send(err);

            }

            var entry = new fileModel({
                name: sampleFile.name,
                data: sampleFile.data,
                path: `${serverUrl}/uploads/${sampleFile.name}`,
                email: sampleFile.businessEmail,
            })

            entry.save((err, data) => {
                if (err) {
                    if (err instanceof DuplicateErr) {
                        reject(err);
                        return;
                    }
                    reject(err);
                }
                res.status(200).send(data);

            })
        });
    }
    catch (e) {
        res.status(404).send(e);
    }
}

File.prototype.share = async function(req,res){
    try{
       
        var guestDetail = await GuestBusiness.create(req.body)
        console.log("////share file///")
        if(guestDetail.length){
            req.body._id = guestDetail[0]._id;
        }
        else{
            req.body._id = guestDetail._id;
            req.body.guestEmail = guestDetail.guestEmail;
            req.body.password = guestDetail.password;
        }
        console.log(guestDetail);
        if(req.body.path){
            var shareFile = await GuestBusiness.fileToGuest(req.body);
            var fileMail = await GuestBusiness.sendFileMail(req.body);
        }

        res.status(200).send({message:"success"})
 
    }
    catch(e){
         console.log(e)
         res.status(404).send(e)
    }
 }

File.prototype.getAllFromS3 = async function(req,res){
    try{
       var file = await FileBusiness.getAllFilesS3(req.body);
       res.status(200).send(file)
    }
    catch(e){
        res.status(404).send(e)
    }
}

module.exports = new File;