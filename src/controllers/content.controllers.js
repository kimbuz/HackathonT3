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

export default contentCtrl