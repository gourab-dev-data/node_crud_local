const mongoose = require('mongoose');

const CrudSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, 'please add name'],
        trim: true,
        maxlength: [50, 'Name can not be add more than 50 charecter'] 
    },
    description:{
        type: String,
        require: [true, 'please add description'],
        maxlength: [500, 'Description can not be add more than 500 charecter']
    },
    email:{
        type: String,
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please add valid eamil'
        ]
    }
})

module.exports = mongoose.model('Crud', CrudSchema);