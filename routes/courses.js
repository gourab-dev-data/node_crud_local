const express = require('express');

const { getCourses, getCourse, createCourse, updateCourse, deleteCourse } = require('../controllers/courses');

const Courses = require('../models/Course');
const advancedResults = require('../middleware/advancedResult');
const { protect, authorize } = require('../middleware/auth');

routes = express.Router({ mergeParams: true });

routes.route('/').get(advancedResults(Courses, {
    path: 'bootcamp',
    select: 'name description'
}), getCourses).post(protect, authorize('admin'), createCourse);
routes.route('/:id').get(getCourse).put(protect, authorize('admin'), updateCourse).delete(protect, authorize('admin'), deleteCourse);



module.exports = routes;