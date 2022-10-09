import express from 'express';
var router = express.Router();

import {sendEmail} from '../controllers/emailController.js';

router.post('/', sendEmail);

export default router;