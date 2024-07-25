const mongoose = require('mongoose');
const slugify = require('slugify');
const CrudSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please add name'],
        trim: true,
        maxlength: [50, 'Name can not be add more than 50 charecter'] 
    },
    slug: String,
    description:{
        type: String,
        required: [true, 'please add description'],
        maxlength: [500, 'Description can not be add more than 500 charecter']
    },
    email:{
        type: String,
        required: [true, 'please add description'],
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please add valid eamil'
        ]
    }
})

CrudSchema.pre('save', function(next){
    //console.log('Slugify run:', this.name);
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Crud', CrudSchema);