const Crud = require('../models/Crud');
const asyncHandler = require("../controllers/async");
const ErrorResponse = require('../utils/errorResponse');

//@dec      Get all cruds
//@routes   GET /api/v1/crudlist
//@access   Public
exports.getCruds = asyncHandler( async (req, res, next) => {
    const crud = await Crud.find();
    res.status(200).json({ success: true, count: crud.length,  data: crud });
});

//@dec      Get crud
//@routes   GET /api/v1/crudlist/:id
//@access   Public
exports.getCrud = asyncHandler( async (req, res, next) => {
    const crud = await Crud.findById(req.params.id);
    if(!crud){
        //return res.status(400).json({ success: false });
        return next(err);
    }
    res.status(200).json({ success: true, data: crud });
});

//@dec      Create crud
//@routes   POST /api/v1/crudlist/
//@access   Privet
exports.createCrud = asyncHandler( async (req, res, next) => {
    //console.log(req.body);
    const crud = await Crud.create(req.body);
    res.status(201).json({ success: true, data: crud });
});

//@dec      Update crud
//@routes   PUT /api/v1/crudlist/:id
//@access   Privet
exports.updateCrud = asyncHandler( async (req, res, next) => {
    const crud = await Crud.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if(!crud){
        return next(err);
    }
    res.status(200).json({ success: true, data: crud });
});

//@dec      Delete crud
//@routes   DELETE /api/v1/crudlist/:id
//@access   Privet
exports.deleteCrud = asyncHandler( async (req, res, next) => {
    const crud = await Crud.findByIdAndDelete(req.params.id);
    if(!crud){
        return next(err);
    }
    res.status(200).json({ success: true, data: {} });
});