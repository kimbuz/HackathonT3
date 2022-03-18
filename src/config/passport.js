// Load Passport Config
import passport from 'passport'
import passport_local from 'passport-local'
import User from '../models/users.js'

const LocalStrategy = passport_local.Strategy

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email,password,done) => {

    const user = await User.findOne({ email })
    if (!user){
        return done(null, false, {message: 'no existe el usuario'})
    } else {
        const match = await user.matchPassword(password)

        if (!match){
          return done(null, false,{message: 'Contraseña incrrecta'})
        }
        
        return done(null, user);
    }
}));

passport.serializeUser((user, done) => {
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
        done(err,user)
    })
})

export default passport