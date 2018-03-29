var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mytest',(err)=>{
if(err)
console.log(err)

});