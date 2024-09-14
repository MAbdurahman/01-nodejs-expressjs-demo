//**************** imports ****************//
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import Joi from 'joi';

import Template from "./template.js";
import NotFound from './notFound.js';

//**************** configuration setup ****************//
dotenv.config({path: 'backend/config/config.env'});
colors.enable();

//**************** data resources ****************//
const courses = [
   {id:100, name: 'Master JavaScript'},
   {id:200, name: 'Master JavaScript Algorithms'},
   {id:300, name: 'Master JavaScript Data Structures'},
   {id:400, name: 'Master NodeJS'},
   {id:500, name: 'Master ExpressJS'},
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

app.post('/api/v1.0/courses', (req, res) => {
   const {error} = validateCourse(req.body);

   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   let tempCourses = courses.map((course) => course.id);
   let newId = tempCourses.length > 0 ? Math.max.apply(Math, tempCourses) + 100 : 100;

   let newItem = {
      id: newId,
      name: req.body.name,
   }

   courses.push(newItem);

   res.status(201).send(newItem).json({
      'message': "Course successfully created!",
   });
});

app.put('/api/v1.0/courses/:id', (req, res) => {
   let found = courses.find((course) => course.id === parseInt(req.params.id));
   if (!found) {
      res.status(404).send(NotFound());

   }
   const {error} = validateCourse(req.body);

   if (error) {
      return res.status(400).send(error.details[0].message);

   }
   if (found) {
      let updatedCourse = {
         id: found.id,
         name: req.body.name,
      };

      let targetIndex = courses.indexOf(found);

      courses.splice(targetIndex, 1, updatedCourse);

      res.status(201).send(updatedCourse);

   } else {
      res.status(404).json({
         'message': 'Unable to course, because data to update does not match fields!'
      });
   }
});

app.delete('/api/v1.0/courses/:id', (req, res) => {
   let found = courses.find((course) => course.id === parseInt(req.params.id));

   if (!found) {
      res.status(404).send(NotFound());

   } else {
      let targetIndex = courses.indexOf(found);

      courses.splice(targetIndex, 1);

      res.send(found).status(204);
   }
});


//**************** helper functions ****************//
function validateCourse(course) {
   const schema = Joi.object().keys({
      name: Joi.string().min(3).required()
   });

   return schema.validate(course);

}//end of validateCourse Function