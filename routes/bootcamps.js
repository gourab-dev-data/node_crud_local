const express = require('express');

const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp } = require('../controllers/bootcamps');

routes = express.Router();

routes.route('/').get(getBootcamps).post(createBootcamp);
routes.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);

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