const express = require('express');

const { getCourses, getCourse, createCourse, updateCourse, deleteCourse } = require('../controllers/courses');

const Courses = require('../models/Course');
const advancedResults = require('../middleware/advancedResult');
const { protect } = require('../middleware/auth');

routes = express.Router({ mergeParams: true });

routes.route('/').get(advancedResults(Courses, {
    path: 'bootcamp',
    select: 'name description'
}), getCourses).post(protect, createCourse);
routes.route('/:id').get(getCourse).put(protect, updateCourse).delete(protect, deleteCourse);



module.exports = routes;