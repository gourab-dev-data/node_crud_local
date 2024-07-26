const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require("./async");
const ErrorResponse = require('../utils/errorResponse');

//@dec      Get all Bootcamps
//@routes   GET /api/v1/bootcamplist
//@access   Public
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    const bootcamp = await Bootcamp.find();
    res.status(200).json({ success: true, count: bootcamp.length,  data: bootcamp });
});

//@dec      Get bootcamp
//@routes   GET /api/v1/crudlist/:id
//@access   Public
exports.getBootcamp = asyncHandler( async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp){
        //return res.status(400).json({ success: false });
        return next(err);
    }
    res.status(200).json({ success: true, data: bootcamp });
});

//@dec      Create bootcamp
//@routes   POST /api/v1/bootcamplist/
//@access   Privet
exports.createBootcamp = asyncHandler( async (req, res, next) => {
    //console.log(req.body);
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
});

//@dec      Update bootcamp
//@routes   PUT /api/v1/bootcamplist/:id
//@access   Privet
exports.updateBootcamp = asyncHandler( async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if(!bootcamp){
        return next(err);
    }
    res.status(200).json({ success: true, data: bootcamp });
});

//@dec      Delete bootcamp
//@routes   DELETE /api/v1/bootcamplist/:id
//@access   Privet
exports.deleteBootcamp = asyncHandler( async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if(!bootcamp){
        return next(err);
    }
    res.status(200).json({ success: true, data: {} });
});