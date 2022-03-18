import 'dotenv/config'
import app from './src/app.js'
//import mongoose from 'mongoose'
import mongoose from './src/config/database.js'

console.log(`
===============================================================================
Welcome to Hackaton Backend
===============================================================================
`)

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
