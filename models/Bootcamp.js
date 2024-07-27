const mongoose = require('mongoose');
const slugify = require('slugify');
const BootcampSchema = new mongoose.Schema({
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
    website:{
        type: String,
        match: [
            /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
            'Please add valid url'
        ]
    },
    phone:{
        type: String,
        required: [true, 'please add phone Number'],
        maxlength: [15, 'Phone Number can not be add more than 15 charecter']
    },    
    email:{
        type: String,
        required: [true, 'please add description'],
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please add valid eamil'
        ]
    },
    address:{
        type: String,
        required: [true, 'please add address']
    },
    location:{
        // Geojson point
        type:{
            type: String,
            enum: ['point'],
        },
        coordinates:{
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    careers:{
        type: [String],
        required: true,
        enum: [
            'Mobile Development',
            'Web Development',
            'Data Science',
            'Business',
            'UI/UX',
        ]
    },
    averageRating:{
        type: Number,
        min: [1, "Min rating"],
        max: [10, 'max rating']
    },
    averageCost: Number,
    photo:{
        type: String,
        default: 'no-image.jpg'
    },
    housing:{
        type: Boolean,
        default: false
    },
    jobAssistance:{
        type: Boolean,
        default: false
    },
    jobGuarantee:{
        type: Boolean,
        default: false
    },
    acceptGi:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

})

BootcampSchema.pre('save', function(next){
    //console.log('Slugify run:', this.name);
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);