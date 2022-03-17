import express from 'express'
import loginModel from '../model/loginModel.js'

const exampleFirebase = express.Router()

//--------------------------------------------
// Its a Class Need To invoke!
const loginFunctions = new loginModel()

exampleFirebase.get('/', async (req,res) => {
  let rslt = await loginFunctions.listarTodo()
  res.json( rslt )
});

export default exampleFirebase
