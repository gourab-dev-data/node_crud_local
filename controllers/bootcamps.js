const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require("./async");
const ErrorResponse = require('../utils/errorResponse');

//@dec      Get all Bootcamps
//@routes   GET /api/v1/bootcamplist
//@access   Public
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    let query;

    //Copy req.query
    const reqQuery = { ...req.query };

    //Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    //Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
     
    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $lte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resources
    query = Bootcamp.find(JSON.parse(queryStr));

    // Select fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        console.log(fields); 
        query = query.select(fields);
    }
    // Sort fields
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        console.log(sortBy); 
        query = query.sort(sortBy);
    }else{
        query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = ( page - 1 ) * limit;
    const endIndex = page * limit; 
    const total = await Bootcamp.countDocuments();

    query = query.skip(startIndex).limit(limit);
    
    // Executing query 
    const bootcamp = await query;

    // Pagination result
    const pagination = {};
    if( endIndex < total ){
        pagination.next={
            page: page + 1,
            limit
        }
    }
    if( startIndex > 0 ){
        pagination.prv={
            page: page - 1,
            limit
        }
    }

    res.status(200).json({ success: true, count: bootcamp.length, pagination, data: bootcamp });
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