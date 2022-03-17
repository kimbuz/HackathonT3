import express from 'express'
import exampleController from '../controllers/exampleController.js'

const exampleRoute = express.Router()

exampleRoute.get('/', exampleController.function0 );

exampleRoute.post('/', exampleController.function1 );

exampleRoute.get('/logout', exampleController.function2 );

export default exampleRoute
