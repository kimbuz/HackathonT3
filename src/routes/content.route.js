//imports
import Router from 'express'
import contentCtrl from '../controllers/content.controllers.js'

const contentRoute = Router();

//Rutes
contentRoute.get('/', contentCtrl.getAll )

contentRoute.get('/random', contentCtrl.getRandom)

contentRoute.get('/premieres', contentCtrl.getPremieres)

contentRoute.get('/movies', contentCtrl.getMovies)

contentRoute.get('/series', contentCtrl.getSeries)

contentRoute.get('/genres', contentCtrl.getAllgenres)

contentRoute.get('/genres/:genre', contentCtrl.getByGenres)

contentRoute.get('/:id', contentCtrl.getById )

//export

export default contentRoute