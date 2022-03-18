//Imports
import passport from 'passport'
import User from '../models/users.js'

const UsersCtrl = {};

//Router Functions
UsersCtrl.signUp = async (req,res)=>{
    const errors =[]
    const{name, email,password, confirm_password} = req.body;

    if(password != confirm_password){
        errors.push({text: 'Passwords not match'})
    }

    if(password.length < 4){
      errors.push({text: 'Short Password'})
    }

    if(errors.length > 0){
      res.status(400).json( { message: 'missing data'} )

    } else {
        try {
            const emailUser = await User.findOne({email:email}).lean()
            if(emailUser){
                res.status(400).json({ message: 'Email Already Taken'})
            } else {
                const newUser = new User({name,email,password})
                newUser.password = await newUser.encryptPassword(password)
                await newUser.save();
                res.status(200).json( { message: 'login ok'} )
            }
        // If Something fails, Return Server Error.
        } catch (err) {
            res.status(500).json( { message: `Server Error ${err}`} )
        }
    }
}

//Login autentication
UsersCtrl.login = passport.authenticate('local')

//LogOut
UsersCtrl.logOut = (req,res)=>{
    req.logOut();
    res.status(200).json({"message": "logout"})
}

export default UsersCtrl