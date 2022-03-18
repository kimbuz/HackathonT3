//Imports
import Router from 'express'
import usersCtrl from '../controllers/users.controllers.js'

const userRoute = Router();

//Rutes
userRoute.post('/signup', usersCtrl.signUp )

userRoute.post('/login', usersCtrl.login, 
  (req,res)=> { 
    res.status(200).json({ 
      message: 'loginok', 
      user_name: req.user.name, 
      user_email: req.user.email
    }) 
  })

userRoute.get('/logout',usersCtrl.logOut )

//export
export default userRoute