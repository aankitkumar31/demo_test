// var bcrypt = require('bcryptjs');
// const saltRounds = 10;

// var Password = function(){

// }

// Password.prototype.generate= async (req,res,next)=>{
//         return new Promise((resolve,reject)=>{
//         let plainPassword = req.body.password;
//         bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
//             console.log("/////////password generate")
//                 if(err){
//                     res.status(404).send("Error")
//                     return;
//                 }
//                 console.log(hash)
//                 req.body.password = hash
//                 next();
//             });
//         })

//     }


// module.exports = new Password();