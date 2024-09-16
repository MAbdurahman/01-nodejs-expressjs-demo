import Joi from 'joi';
import Course from '../models/courseModel.js';
import {errorMessageHandler} from '../utils/errorMessageUtils.js';

export const createCourse =  async (req, res, next) => {
   try {
      const {error} = validateCourse(req.body);

      if (error) {
         return res.status(400).send(error.details[0].message);
      }

      const {name, author, tags, isPublished} = req.body;

      const newCourse = new Course({name, author, tags, isPublished});
      await newCourse.save();

      res.status(201).send(newCourse);

   }
   catch (err) {
      next(err);
   }
}//end of createCourse Function

export const getAllCourses = async (req, res, next) => {
   try {
      const courses = await Course.find();
      if (!courses) {
         return errorMessageHandler(res, 'Courses not found', 404);
      }
      res.status(200).send(courses);

   }
   catch (err) {
      next(err);
   }
}//end of getAllCourses Function

export const getCourseById = async (req, res, next) => {
   const { id } = req.params;
   try {
      const foundCourse = await Course.findById(id);
      if (!foundCourse) {
         return errorMessageHandler(res, 'Course not found', 404);
      }
      res.status(200).send(foundCourse);
   }
   catch (err) {
      next(err);
   }
}//end of getCourseById Function

export const updateCourse = async (req, res, next) => {
   const { id } = req.params;
   const { name, author, tags, isPublished } = req.body;
   try {
      const updatedCourse = {name, author, tags, isPublished};
      const results = await Course.findByIdAndUpdate(id, updatedCourse, {new: true});
      res.status(200).send(results);

   }
   catch (err) {
      next(err);
   }
}//end of updateCourse Function

export const deleteCourse = async (req, res, next) => {
   const { id } = req.params;
   try {
      const deletedCourse = await Course.findByIdAndDelete(id);
      if (!deletedCourse) {
         return errorMessageHandler(res, 'Course not found', 404);
      }
      res.status(200).send(deletedCourse);

   }
   catch (err) {
      next(err);
   }
}//end of deleteCourse Function

/************************* functions *************************/
function validateCourse(course) {
   const schema = Joi.object().keys({
      name: Joi.string().min(3).required(),
      author: Joi.string().min(4).required(),
      tags: Joi.array().items(Joi.string().required()),
      isPublished: Joi.boolean().required(),
   });

   return schema.validate(course);

}//end of validateCourse Function