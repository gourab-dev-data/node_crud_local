const express = require('express');

const { getCourses, getCourse, createCourse, updateCourse, deleteCourse } = require('../controllers/courses');

const Courses = require('../models/Course');
const advancedResults = require('../middleware/advancedResult');

routes = express.Router({ mergeParams: true });

routes.route('/').get(advancedResults(Courses, {
    path: 'bootcamp',
    select: 'name description'
}), getCourses).post(createCourse);
routes.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);



module.exports = routes;