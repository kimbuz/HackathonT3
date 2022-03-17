import passport from 'passport'

import User from '../models/users.js'

const UsersCtrl = {};

UsersCtrl.signUp = async (req,res)=>{
    const errors =[]
    const{name, email,password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text: 'Passwords no coinciden'})
    }
    if(password.length < 4){
        errors.push({text: 'Password muy corta'})
    }
    if(errors.length > 0){
      res.status(404).json( { status: 'missing data'})
    } else{
        const emailUser =await User.findOne({email:email}).lean()
        if(emailUser){
            res.status(404).json({ status: 'bad user'})
        } else {
            const newUser = new User({name,email,password})
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            res.status(200).json( { status: 'login ok'})
        }
    }
}

UsersCtrl.login = passport.authenticate('local',{ failureRedirect: '/login' }, (req, res) => { res.redirect('/'); })

UsersCtrl.logOut = (req,res)=>{
    req.logOut();
    res.status(200).json({"status": "logout"})
}


export default UsersCtrl