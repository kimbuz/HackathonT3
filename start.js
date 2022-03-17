import 'dotenv/config'
import app from './src/app.js'
import mongoose from 'mongoose'

console.log(`
===============================================================================
Welcome to Hackaton Backend
===============================================================================
`)

const { MONGODB_USER, MONGODB_PASS, MONGODB_HOST, MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_HOST}/${MONGODB_DATABASE}`
mongoose.connect(MONGODB_URI)
        .then(db => console.log('database is connected'))
        .catch(err => console.log(err));

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
