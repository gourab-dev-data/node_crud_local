const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load Models
const Bootcamp = require('./models/Bootcamp');

// Connect DB
mongoose.connect(process.env.MONGO_URI).then( () => console.log('Database connected')).catch( (err) => console.log('Database connection', err));

const bootcamp = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

// Importe data
const importData = async () => {
    try {
        await Bootcamp.create(bootcamp);
        console.log('Data imported..');
        process.exit();
    }catch(err){
        console.error(err);
    }
}

// Delete data
const deleteData = async () => {
    try {
        await Crud.deleteMany();
        console.log('Data Deleted..');
        process.exit();
    }catch(err){
        console.error(err);
    }
}

if(process.argv[2] == '-i'){
    importData();
}else if(process.argv[2] == '-d'){
    deleteData();
}