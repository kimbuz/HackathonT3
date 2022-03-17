import Content from '../models/content'

const contentCtrl = {}

contentCtrl.getAll = async (req,res)=>{
    const contentAll = await Content.find({}, { __v: 0 }).lean()
    return contentAll
}

contentCtrl.getById = async (req,res)=>{
    const contentById = await Content.find({id:req.params.id}).lean()
    return contentById
}