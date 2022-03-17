import Router from 'express'
import usersCtrl from '../controllers/users.controllers.js'

const userRoute = Router();

userRoute.post('/signup', usersCtrl.signUp)

userRoute.post('/login', usersCtrl.login)

userRoute.get('/logout',usersCtrl.logOut)

export default userRoute