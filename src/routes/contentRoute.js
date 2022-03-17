import Router from 'express'
import contentCtrl from '../controllers/content.controllers.js'

const contentRoute = Router();

contentRoute.get('/contents', contentCtrl.getAll )

contentRoute.get('/content/:id', contentCtrl.getById )

contentRoute.get('/content/genres', contentCtrl.getGenres)

contentRoute.get('/content/genres/:geners', contentCtrl.getByGenres)


export default userRoute