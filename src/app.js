import express from 'express'
import session from 'express-session'

import loginRoute from './routes/loginRouter.js'

import swaggerUi from 'swagger-ui-express'

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require('../docs/swagger.json');


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
    resave: true
  })
);

// Routes
app.get('/', (req,res) => {
  res.send('MainPage')
})

app.use( '/login', loginRoute )

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument, { explorer: true }));

export default app