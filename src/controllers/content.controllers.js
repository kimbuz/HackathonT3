//Imports
import Content from '../models/content.js'

const contentCtrl = {}

//Router Functions
contentCtrl.getAll = async (req,res)=>{
    try {
        const contentAll = await Content.find({}, { __v: 0 }).lean()
        res.json(contentAll)
    } catch(err){
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

contentCtrl.getRandom = async (req,res)=>{
    try {
        //Pending Build Total Document Count
        const nn = Math.floor(Math.random() * 20)
        const contentRandom = await Content.findOne().skip(nn).lean()
        res.json(contentRandom)
    } catch(err){
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

contentCtrl.getById = async (req,res)=>{
    try {
        const contentById = await Content.findOne({'_id':req.params.id}).lean()
        res.json(contentById)
    } catch(err){
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

contentCtrl.getPremieres = async (req,res)=>{
    try {
        const contentPremieres = await Content.find({year:{$gte: 2021}}).lean()
        res.json(contentPremieres)
    } catch(err){
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

contentCtrl.getMovies = async (req,res)=>{
    try {
        const contentPremieres = await Content.find({'info.type':{$eq:'Movie'}}).lean()
        res.json(contentPremieres)
    } catch(err){
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

contentCtrl.getSeries = async (req,res)=>{
    try {
        const contentPremieres = await Content.find({'info.type':{$eq:'Serie'}}).lean()
        res.json(contentPremieres)
    } catch(err){
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

contentCtrl.getAllgenres = async (req,res)=>{
    try {
        const contentPremieres = await Content.distinct('info.genres') 
        res.json(contentPremieres)
    } catch(err){
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

contentCtrl.getByGenres = async (req,res)=>{
    try {
        const contentPremieres = await Content.find({'info.genres':{$in:[req.params.genre]}}).lean() 
        res.json(contentPremieres)
    } catch(err){
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

//Export
export default contentCtrl