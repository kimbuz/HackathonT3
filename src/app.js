import express from 'express'
import session from 'express-session'
import cors from 'cors'
import morgan from 'morgan'

//--------------------------------------------
// Load Login Controller
import loginController from './controllers/loginController.js'

import exampleFirebase from './routes/exampleFirebase.js'
import userRoute from './routes/user.routes.js'

//--------------------------------------------
// Swagger Server for API documentation
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./src/docs/swagger.yaml');

//--------------------------------------------
// Base Url For Relative path
const base_url = '/api/v1'

//--------------------------------------------
// Build Express App
const app = express()


//--------------------------------------------
// Middlewares Load
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//--------------------------------------------
// Session Handler
app.use(
  session({
    secret: 'L1ttl3DarkS3cr3t',
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);
const validSession = (req,res,next) => {
  if(req.session.username){
    next()
  }else{
    res.status(401).send()
  }
}

//--------------------------------------------
// Load Passport Config
import passport from 'passport'
import passport_local from 'passport-local'
import User from './models/users.js'

const LocalStrategy = passport_local.Strategy

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (req,email,password,done) => {
    //si existe el correo del usuario
    //console.log('BreakPoin1')

    const user = await User.findOne({ email })
    if (!user){
        return done(null, false, {message: 'no existe el usuario'})
    } else {
        console.log(user)
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

//require('./config/passport')
app.use(passport.initialize());
app.use(passport.session())

//--------------------------------------------
// Enable Cors, Should Lock Origin
app.use(cors())

//--------------------------------------------
// Midleware for Api Documentation
app.use( base_url + '/docs', swaggerUi.serve);
app.get( base_url + '/docs', swaggerUi.setup(swaggerDocument, { explorer: true }));

//--------------------------------------------
// Login Apis | No validation for Login
app.use( base_url + '/users', userRoute )

//--------------------------------------------
// Default Route
app.get('*', (req,res) => {
  res.redirect( '/login.html' )
})

export default app