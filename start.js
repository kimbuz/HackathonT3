import 'dotenv/config'
import app from './src/app.js'

/*
    set DATABASE = json
    set ADMINUSER = admin
*/

console.log(`
===============================================================================
Definir variables de entorno, intente por dotenv pero falla en las otras libs

===============================================================================
`)

console.log( 'Database Method: ', process.env.DATABASE )
console.log( 'Admin UserName: ', process.env.ADMINUSER )

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
