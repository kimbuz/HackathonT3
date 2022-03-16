//const login = require('../model/loginModel.js')

const myusername = 'admin'
const mypassword = 'pass'

const login_login = (req,res) => {
  if(req.body.username == myusername && req.body.password == mypassword){
    let session = req.session;
    session.username = req.body.username;
    console.log( req.session )
    res.send(`Hey there, welcome <a href=\'/login/logout'>click to logout</a>`);
  } else{
    res.send('Invalid username or password');
  }
}
`12`
const login_logout = (req,res) => {
  req.session.destroy();
  res.redirect('/');
}

export default {
  login_login,
  login_logout
}