import express from 'express'
import loginController from '../controllers/loginController.js'

loginRoute = express.Router()

login.get('/', (req,res) =>{
  session=req.session;
  if(session.userid){
    res.send("Welcome User <a href=\'/logout'>click to logout</a>");
  }else {
    res.sendFile('views/index.html',{root:__dirname})
  }
});

login.post('/', loginController.login_login);

login.get('/logout', loginController.login_logout);

module.export = loginRoute
