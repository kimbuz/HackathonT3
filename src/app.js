import express from 'express'
import session from 'express-session'
import cors from 'cors'

//--------------------------------------------
// Load Login Controller
import loginController from './controllers/loginController.js'
import exampleFirebase from './routes/exampleFirebase.js'

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
// Enable Cors, Should Lock Origin
app.use(cors())

//--------------------------------------------
// Midleware for Api Documentation
app.use( base_url + '/docs', swaggerUi.serve);
app.get( base_url + '/docs', swaggerUi.setup(swaggerDocument, { explorer: true }));

//--------------------------------------------
// Login Apis | No validation for Login
app.post( base_url + '/login', loginController.login )
app.get( base_url + '/logout', validSession, loginController.logout )

//--------------------------------------------
// Test Firebase Connect
app.use( base_url + '/firebase', validSession, exampleFirebase )

//--------------------------------------------
// Default Route
app.get('*', (req,res) => {
  res.redirect( '/login.html' )
})

export default app