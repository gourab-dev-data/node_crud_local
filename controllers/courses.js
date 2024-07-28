const Courses = require('../models/Course');
const asyncHandler = require("./async");
const ErrorResponse = require('../utils/errorResponse');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

//@dec      Get all Courses
//@routes   GET /api/v1/courses
//@routes   GET /api/v1/bootcamps/:bootcampId/courses
//@access   Public
exports.getCourses = asyncHandler( async (req, res, next) => {
    
    if(req.params.bootcampId){
        const courses = await Course.find({ bootcamp: req.params.bootcampId });
        res.status(200).json({ success: true, count: courses.length, pagination, data: courses });
    }else{
        res.status(200).json(res.advancedResult);
    }
});

//@dec      Get course
//@routes   GET /api/v1/courses/:id
//@access   Public
exports.getCourse = asyncHandler( async (req, res, next) => {
    const course = await Courses.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });
    if(!course){
        //return res.status(400).json({ success: false });
        return next( new ErrorResponse(`can't find by ths course id ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: course });
});

//@dec      Create course by bootcampId
//@routes   POST /api/v1/bootcamps/:bootcampId/courses
//@access   Privet
exports.createCourse = asyncHandler( async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if(!bootcamp){
        //return res.status(400).json({ success: false });
        return next( new ErrorResponse(`No bootcamp with the id of ${req.params.id}`, 404));
    }
    //console.log(req.body);
    const course = await Courses.create(req.body);

    res.status(201).json({ success: true, data: course });
});

//@dec      Update course
//@routes   PUT /api/v1/courses/:id
//@access   Privet
exports.updateCourse = asyncHandler( async (req, res, next) => {
    let course = await Course.findById(req.params.id);
    if(!course){
        //return res.status(400).json({ success: false });
        return next( new ErrorResponse(`No course with the id of ${req.params.id}`, 404));
    }
    //console.log(req.body);
    course = await Courses.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(201).json({ success: true, data: course });
});

//@dec      Delete course
//@routes   DELETE /api/v1/courses/:id
//@access   Privet
exports.deleteCourse = asyncHandler( async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if(!course){
        //return res.status(400).json({ success: false });
        return next( new ErrorResponse(`No course with the id of ${req.params.id}`, 404));
    }
    //console.log(req.body);
    await course.deleteOne();

    res.status(200).json({ success: true, data: {} });
});