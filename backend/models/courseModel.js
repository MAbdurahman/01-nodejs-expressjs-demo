/************************* imports *************************/
import mongoose from 'mongoose';

const courseModel = new mongoose.Schema({
      name: {
         type: String,
         trim: true,
         required: true,
      },
      author: {
         type: String,
         trim: true,
         required: true,
      },
      tags: {
         type: [String],
         trim: true,
         required: true,
      },
      date: {
         type: Date,
         default: Date.now,
      },
      isPublished: {
         type: Boolean,
      }
   });
const Course = mongoose.model('Course', courseModel);

export default Course;