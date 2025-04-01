import { Router } from 'express';
import { obtenerEmpleados, obtenerEmpleado } from '../controllers/empleados.controller.js';

const router = Router();

// Ruta para obtener todos los empleados
router.get('/empleados', obtenerEmpleados);

// Ruta para obtener un empleado por su ID
router.get('/empleado/:id', obtenerEmpleado);

export default router;