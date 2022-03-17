//--------------------------------------------
// Login Controller
import loginModel from '../model/loginModel.js'

const myusername = 'admin'
const mypassword = 'pass'

const login = (req,res) => {
  if(req.body.username == myusername 
  && req.body.password == mypassword){
    req.session.username = req.body.username
    console.log( req.session )
    res.json({
      "sessionId": req.session
    })
  } else{
    res.status(401).send()
  }
}

const logout = (req,res) => {
  req.session.destroy();
  res.redirect('/');
}

export default {
  login,
  logout
}