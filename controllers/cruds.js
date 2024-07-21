//@dec      Get all cruds
//@routes   GET /api/v1/crudlist
//@access   Public
exports.getCruds = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Show all crudlist" });
}

//@dec      Get crud
//@routes   GET /api/v1/crudlist/:id
//@access   Public
exports.getCrud = (req, res, next) => {
    res.status(200).json({ success: true, msg: `get ${req.params.id} on crudlist` });
}

//@dec      Create crud
//@routes   POST /api/v1/crudlist/
//@access   Privet
exports.createCrud = (req, res, next) => {
    res.status(200).json({ success: true, msg: "add on crudlist" });
}

//@dec      Update crud
//@routes   PUT /api/v1/crudlist/:id
//@access   Privet
exports.updateCrud = (req, res, next) => {
    res.status(200).json({ success: true, msg: `update ${req.params.id} on crudlist` });
}

//@dec      Delete crud
//@routes   DELETE /api/v1/crudlist/:id
//@access   Privet
exports.deleteCrud = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete ${req.params.id} on crudlist` });
}