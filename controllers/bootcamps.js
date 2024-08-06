const path = require('path');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require("./async");
const ErrorResponse = require('../utils/errorResponse');

//@dec      Get all Bootcamps
//@routes   GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    res.status(200).json(res.advancedResult);
});

//@dec      Get bootcamp
//@routes   GET /api/v1/bootcamps/:id
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
//@routes   POST /api/v1/bootcamps/
//@access   Privet
exports.createBootcamp = asyncHandler( async (req, res, next) => {
    //console.log(req.body);
    console.log(req.user.id);

    req.body.user = req.user.id;
    const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });
    if(publishedBootcamp && req.user.role !== 'admin'){
        return next( new ErrorResponse(`This user with id ${req.user.id} has already published on bootcamp`), 400);
    }
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
});

//@dec      Update bootcamp
//@routes   PUT /api/v1/bootcamps/:id
//@access   Privet
exports.updateBootcamp = asyncHandler( async (req, res, next) => {
    let bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp){
        return next(err);
    }
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin'){
        return next( new ErrorResponse(`User ${req.user.id} not authorized`));
    }
    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({ success: true, data: bootcamp });
});

//@dec      Delete bootcamp
//@routes   DELETE /api/v1/bootcamps/:id
//@access   Privet
exports.deleteBootcamp = asyncHandler( async (req, res, next) => {
    //const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp){
        return next(err);
    }
    // Remove method trigger the middleware
    bootcamp.remove();
    res.status(200).json({ success: true, data: {} });
});

//@dec      Update bootcamp photo
//@routes   PUT /api/v1/bootcamps/:id/photo
//@access   Privet
exports.uploadPhotoBootcamp = asyncHandler( async (req, res, next) => {
    //const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp not find with id of ${req.params.id}`, 400));
    }
    
    if(!req.files.file){
        return next(new ErrorResponse(`Please upload a file`, 400));
    }
    console.log(req.files.file);
    const file = req.files.file;

    // Make sure the image is a photo
    if(!file.mimetype.startsWith('image')){
        return next(new ErrorResponse(`Please upload an image file`));
    }

    if(file.size > process.env.MAX_FILE_UPLOAD){
        return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    // Create file name
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if(err){
            console.log(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
        res.status(200).json({ success: true, data: file.name });
    });
    
});