import express from 'express';
import Template from '../template.js';
/************************* variables *************************/
const router = express.Router();

/************************* route *************************/
router.get('/', (req, res) => {
   res.send(Template());
});

export default router;