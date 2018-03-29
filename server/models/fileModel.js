var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var Duplicate = require('../error/duplicateError')
var fileSchema = mongoose.Schema({
    name:{type:String},
    path: { type: String },
    data:{type:String},
    createdAt:{type:Date,default:Date.now()},
    email: { type: String },
},{collection:'file'})  

module.exports = mongoose.model('file',fileSchema);