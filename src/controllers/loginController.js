//const login = require('../model/loginModel.js')

myusername = 'admin'
mypassword = 'pass'

const login_login = (req,res) => {
  if(req.body.username == myusername && req.body.password == mypassword){
    session=req.session;
    session.userid=req.body.username;
    console.log(req.session)
    res.send(`Hey there, welcome <a href=\'/login/logout'>click to logout</a>`);
  }
  else{
    res.send('Invalid username or password');
  }
}

const login_logout = (req,res) => {
  req.session.destroy();
  res.redirect('/');
}

module.exports = {
  login_login,
  login_logout
}