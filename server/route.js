var ProfileController = require('./controllers/profileController')
var FileController = require('./controllers/fileController')
var password = require('./middleware/passwordHash')
var token = require('./middleware/token')
module.exports = function(app){ 

    //
   
    
    app.post('/register',ProfileController.signUp);
    app.post('/setPassword',ProfileController.setPassword.bind(ProfileController));
    app.post('/login',ProfileController.login.bind(ProfileController));

    app.post('/uploadFile',FileController.upload.bind(FileController));
    app.post('/shareFile',token.Token,FileController.share.bind(FileController));
    app.post('/getAllFiles',FileController.getAllFiles.bind(FileController));

    // app.get('/test',profile.test.bind(profile));
    

}