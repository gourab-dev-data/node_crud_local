const Crud = require('../models/Crud');
const ErrorResponse = require('../utils/errorResponse');

//@dec      Get all cruds
//@routes   GET /api/v1/crudlist
//@access   Public
exports.getCruds = async (req, res, next) => {
    try{
        const crud = await Crud.find();
        res.status(200).json({ success: true, data: crud });
    }catch(err){
        res.status(400).json({ success: false });
    }
}

//@dec      Get crud
//@routes   GET /api/v1/crudlist/:id
//@access   Public
exports.getCrud = async (req, res, next) => {
    try{
        const crud = await Crud.findById(req.params.id);
        if(!crud){
            //return res.status(400).json({ success: false });
            return next(err);
        }
        res.status(200).json({ success: true, data: crud });
    }catch(err){
        //next(err);
        //res.status(400).json({ success: false });
        next(err);
    }
}

//@dec      Create crud
//@routes   POST /api/v1/crudlist/
//@access   Privet
exports.createCrud = async (req, res, next) => {
    //console.log(req.body);
    try{
        const crud = await Crud.create(req.body);
        res.status(201).json({ success: true, data: crud });
    }catch(err){
        //res.status(400).json({ success: false });
        next(err);
    }
    
}

//@dec      Update crud
//@routes   PUT /api/v1/crudlist/:id
//@access   Privet
exports.updateCrud = async (req, res, next) => {
    try{
        const crud = await Crud.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!crud){
            return next(err);
        }
        res.status(200).json({ success: true, data: crud });
    }catch (err){
        next(err);
    }
}

//@dec      Delete crud
//@routes   DELETE /api/v1/crudlist/:id
//@access   Privet
exports.deleteCrud = async (req, res, next) => {
    try{
        const crud = await Crud.findByIdAndDelete(req.params.id);
        if(!crud){
            return next(err);
        }
        res.status(200).json({ success: true, data: {} });
    }catch (err){
        next(err);
    }
}