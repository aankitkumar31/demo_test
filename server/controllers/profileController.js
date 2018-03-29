var ProfileBusiness = require('../business/profileBusiness')
var userModel = require('../models/userModel')
var async = require('async');
var DuplicateErr = require('../error/duplicateError')
const nodemailer = require('nodemailer');
const transporter = require('../config/mailConfig');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Profile = function(){

}

Profile.prototype.signUp = async function(req,res){
    console.log(req.body);
    try{
        var profileData =  await ProfileBusiness.create(req.body)
        res.status(200).send({message:"success"})
    }
    catch(e){
        console.log(e);
        res.status(404).send(e)
    }
}

Profile.prototype.setPassword = async function(req,res){
    console.log(req.body);
    try{
        var createPassword = await ProfileBusiness.setPassword(req.body)
        res.status(200).send({message:"success"})
    }
    catch(e){
        console.log(e);
        res.status(404).send(e)
    }
}


Profile.prototype.login = async function(req,res){
    console.log(req.body);
    try{
        var login = await ProfileBusiness.login(req.body)
        console.log(login)
        res.status(200).send(login);
    }
    catch(e){
        res.status(404).send(e);
    }
}


module.exports = new Profile;