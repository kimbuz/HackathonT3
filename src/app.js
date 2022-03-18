import express from 'express'
import session from 'express-session'
import cors from 'cors'
import morgan from 'morgan'
import passport from './config/passport.js'

//--------------------------------------------
// Load User Routes
import userRoute from './routes/user.routes.js'
import contentRoute from './routes/content.route.js'

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
app.use(express.urlencoded({ extended: true }))

//--------------------------------------------
// Disable Public, Only For Testing
//app.use(express.static('public'))

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

//--------------------------------------------
//Passport and session initialization
app.use(passport.initialize());
app.use(passport.session())

//--------------------------------------------
// Helper function for autentification check
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { 
    return next()
  } 
  return res.status(401).json({ message: 'Not Authenticated'})
}

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
// Content api witch validation
//app.use( base_url + '/content', checkAuthenticated, contentRoute )
app.use( base_url + '/content', contentRoute )

//--------------------------------------------
// Default Route
app.get('*', (req,res) => {
  res.status(404).json( { message: 'Not Available' } )
})

export default app