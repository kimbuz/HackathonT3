import express from 'express'
import loginController from '../controllers/loginController.js'

const loginRoute = express.Router()

loginRoute.get('/', (req,res) =>{
  if(req.session.username){
    res.send("Welcome User <a href=\'/logout'>click to logout</a>");
  }else {
    res.redirect('/login.html')
  }
});

loginRoute.post('/', loginController.login_login);

loginRoute.get('/logout', loginController.login_logout);

export default loginRoute
