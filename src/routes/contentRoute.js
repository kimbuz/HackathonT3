import Router from 'express'
import contentCtrl from '../controllers/content.controllers.js'

const contentRoute = Router();

contentRoute.get('/', contentCtrl.getAll )

contentRoute.get('/:id', contentCtrl.getById )

// contentRoute.get('/genres', contentCtrl.getGenres)

// contentRoute.get('/genres/:geners', contentCtrl.getByGenres)


export default contentRoute