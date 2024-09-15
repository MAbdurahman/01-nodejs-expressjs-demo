import express from 'express';
import Joi from 'joi';

import NotFound from '../notFound.js';


const router = express.Router();

/************************* data resources *************************/
const courses = [
   {id:100, name: 'Master JavaScript'},
   {id:200, name: 'Master JavaScript Algorithms'},
   {id:300, name: 'Master JavaScript Data Structures'},
   {id:400, name: 'Master NodeJS'},
   {id:500, name: 'Master ExpressJS'},
]

/************************* routes *************************/
router.get('/', (req, res) => {
   res.send(courses);
});

router.get('/:id', (req, res) => {
   let foundCourse = courses.find((course) => course.id === parseInt(req.params.id));

   if (!foundCourse) {
      res.status(404).send(NotFound());

   } else {
      res.status(200).json(foundCourse);
   }
});

router.post('/', (req, res) => {
   const {error} = validateCourse(req.body);

   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   let tempCourses = courses.map((course) => course.id);
   let newId = tempCourses.length > 0 ? Math.max.apply(Math, tempCourses) + 100 : 100;

   let newCourse = {
      id: newId,
      name: req.body.name,
   }

   courses.push(newCourse);

   res.status(201).send(newCourse).json({
      'message': "Course successfully created!",
   });
});

router.put('/:id', (req, res) => {
   let foundCourse = courses.find((course) => course.id === parseInt(req.params.id));
   if (!foundCourse) {
      res.status(404).send(NotFound());

   }
   const {error} = validateCourse(req.body);

   if (error) {
      return res.status(400).send(error.details[0].message);

   }
   if (foundCourse) {
      let updatedCourse = {
         id: foundCourse.id,
         name: req.body.name,
      };

      let targetIndex = courses.indexOf(foundCourse);
      courses.splice(targetIndex, 1, updatedCourse);

      res.status(201).send(updatedCourse);

   } else {
      res.status(404).json({
         'message': 'Unable to update course, because data does not match fields!'
      });
   }
});

router.delete('/:id', (req, res) => {
   let foundCourse = courses.find((course) => course.id === parseInt(req.params.id));

   if (!foundCourse) {
      res.status(404).send(NotFound());

   } else {
      let targetIndex = courses.indexOf(foundCourse);

      courses.splice(targetIndex, 1);

      res.send(foundCourse).status(204);
   }
});

/************************* functions *************************/
function validateCourse(course) {
   const schema = Joi.object().keys({
      name: Joi.string().min(3).required()
   });

   return schema.validate(course);

}//end of validateCourse Function

export default router;