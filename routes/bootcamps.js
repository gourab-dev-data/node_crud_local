const express = require('express');

const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, uploadPhotoBootcamp } = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advancedResult = require('../middleware/advancedResult');

// Include other resource routers
const courseRouter = require('./courses');


routes = express.Router();

// Re-route into other resources routers
routes.use('/:bootcampId/courses', courseRouter);

routes.route('/').get(advancedResult(Bootcamp, 'courses'), getBootcamps).post(createBootcamp);
routes.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);
routes.route('/:id/photo').put(uploadPhotoBootcamp);

// routes.get('/', (req, res) => {
//     res.status(200).json({ success: true, msg: "Show all crudlist" });
// });

// routes.get('/:id', (req, res) => {
//     res.status(200).json({ success: true, msg: `get ${req.params.id} on crudlist` });
// });

// routes.post('/', (req, res) => {
//     res.status(200).json({ success: true, msg: "add on crudlist" });
// });

// routes.put('/:id', (req, res) => {
//     res.status(200).json({ success: true, msg: `update ${req.params.id} on crudlist` });
// });

// routes.delete('/:id', (req, res) => {
//     res.status(200).json({ success: true, msg: `Delete ${req.params.id} on crudlist` });
// });

module.exports = routes;