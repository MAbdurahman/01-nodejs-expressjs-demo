/************************* imports *************************/
import path from 'node:path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import helmet from 'helmet';
import morgan from 'morgan';
import homeRoute from './routes/homeRoute.js';
import courseRoutes from './routes/courseRoutes.js';
import connectDatabase from './config/configDatabase.js';

import {loggerMiddleware} from './middlewares/loggerMiddleware.js';
import {authenticateMiddleware} from './middlewares/authenticateMiddleware.js';


/************************* configuration setup *************************/
dotenv.config({path: 'backend/config/config.env'});
colors.enable();

/************************* variables *************************/
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const API_URL = process.env.API_ENV || "/api/v1.0/";

/*********************** connect database ***********************/

/************************* middlewares *************************/
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(helmet());

/************************* app listening *************************/
const server = app.listen(PORT, () => {
   console.log(`The server is listening at - http://127.0.0.1:${PORT}${API_URL} in ${NODE_ENV} mode🔥`.yellow);
});

/************************* routes *************************/
app.use('/api/v1.0/', homeRoute);
app.use('/api/v1.0/courses', courseRoutes);

/************************* custom middlewares *************************/
app.use(loggerMiddleware);
app.use(authenticateMiddleware);