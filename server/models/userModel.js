var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var Duplicate = require('../error/duplicateError')
var userSchema = mongoose.Schema({
    fullName:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    Mobile:{type:String,require:true},
    password:{type:String,require:true}

},{collection:'user'})  


userSchema.post('save', function(error, doc, next) {
    if (error.code === 11000) {
        error = new Duplicate();
        next(error)
        return;
    }
    next();
    
  });
module.exports = mongoose.model('user',userSchema);