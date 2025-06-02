// routes/ia.routes.js
import { Router } from 'express';
import { consultarConIA } from '../controllers/ia.controller.js';

const router = Router();

router.post('/consultarconia', consultarConIA);

export default router;