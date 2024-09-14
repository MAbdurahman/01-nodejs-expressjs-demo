//**************** imports ****************//
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import Template from "./template.js";
import NotFound from './notFound.js';

//**************** configuration setup ****************//
dotenv.config({path: 'backend/config/config.env'});
colors.enable();

//**************** data resources ****************//
const courses = [
   {id:100, name: 'Master JavaScript'},
   {id:200, name: 'Master NodeJS'},
   {id:300, name: 'Master ExpressJS'},
   {id:400, name: 'Master JavaScript Algorithms'},
   {id:500, name: 'Master JavaScript Data Structures'},
]

//**************** variables ****************//
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'DEVELOPMENT';
const API_URL = process.env.API_ENV || "/api/v1.0/";

//**************** middlewares ****************//
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//**************** app listening ****************//
const server = app.listen(PORT, () => {
   console.log(`The server is listening at - http://127.0.0.1:${PORT}${API_URL} in ${NODE_ENV} mode🔥`.yellow);
});

//**************** routes****************//
app.get('/api/v1.0/', (req, res) => {
   res.send(Template());
});

app.get('/api/v1.0/courses/', (req, res) => {
   res.send(courses);
});

app.get('/api/v1.0/courses/:id', (req, res) => {
   let found = courses.find((course) => course.id === parseInt(req.params.id));
   if (!found) {
      res.status(404).send(NotFound());

   } else {
      res.status(200).json(found);
   }
});