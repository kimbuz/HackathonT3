import express from 'express'
import session from 'express-session'

import { loginRoute } from './routes/loginRouter'

// Build Express App
const app = express()

//--------------------------------------------
// Middlewares Load
app.use(express.json())
app.use(express.static('../public'))
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

module.exports = app