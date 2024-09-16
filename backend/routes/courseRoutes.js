/************************* imports *************************/
import express from 'express';
import {
   createCourse,
   getAllCourses,
   getCourseById,
   updateCourse,
   deleteCourse
} from '../controllers/courseControllers.js';

/************************* variables *************************/
const router = express.Router();

/************************* routes *************************/
router.get('/', getAllCourses);

router.get('/:id', getCourseById);

router.post('/', createCourse);

router.put('/:id', updateCourse);

router.delete('/:id', deleteCourse);

export default router;