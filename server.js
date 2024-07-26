const express = require('express');
const dotenv = require('dotenv');
//const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');
const morgan = require('morgan');

const connectDB = require('./config/db');

// Lode config file

dotenv.config({ path: './config/config.env' });

connectDB();

// Routes files

const bootcamps = require('./routes/bootcamps');



const app = express();

// Body Parser
app.use(express.json());

// Custom Middleware
//app.use(logger);

// Thired party Middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


// Mount routers
app.use('/api/v1/bootcamplist', bootcamps);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server runing in ${process.env.NODE_ENV} mode on post ${PORT}`));
