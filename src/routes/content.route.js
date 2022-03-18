import Router from 'express'
import contentCtrl from '../controllers/content.controllers.js'

const contentRoute = Router();

contentRoute.get('/', contentCtrl.getAll )

contentRoute.get('/premieres', contentCtrl.getPremieres)

contentRoute.get('/movies', contentCtrl.getMovies)

contentRoute.get('/series', contentCtrl.getSeries)

contentRoute.get('/genres', contentCtrl.getAllgenres)

contentRoute.get('/:id', contentCtrl.getById )

contentRoute.get('/genres/:genre', contentCtrl.getByGenres)

export default contentRoute