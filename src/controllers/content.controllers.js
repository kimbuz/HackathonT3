import Content from '../models/content.js'

const contentCtrl = {}

contentCtrl.getAll = async (req,res)=>{
    const contentAll = await Content.find({}, { __v: 0 }).lean()
    res.json(contentAll)
}

contentCtrl.getById = async (req,res)=>{
    const contentById = await Content.findOne({'_id':req.params.id}).lean()
    res.json(contentById)
}

contentCtrl.getPremieres = async (req,res)=>{
    const contentPremieres = await Content.find({year:{$gte: 2021}}).lean()
    res.json(contentPremieres)
}

contentCtrl.getMovies = async (req,res)=>{
    const contentPremieres = await Content.find({'info.type':{$eq:'Movie'}}).lean()
    res.json(contentPremieres)
}

contentCtrl.getSeries = async (req,res)=>{
    const contentPremieres = await Content.find({'info.type':{$eq:'Serie'}}).lean()
    res.json(contentPremieres)
}

contentCtrl.getAllgenres = async (req,res)=>{
    const contentPremieres = await Content.distinct('info.genres') 
    res.json(contentPremieres)
}

contentCtrl.getByGenres = async (req,res)=>{
    const contentPremieres = await Content.find({'info.genres':{$in:[req.params.genre]}}).lean() 
    res.json(contentPremieres)
}

export default contentCtrl