import { Router } from 'express';
import { obtenerEmpleados, obtenerEmpleado, registrarEmpleado, eliminarEmpleado, actualizarEmpleado } from '../controllers/empleados.controller.js';

const router = Router();

// Ruta para obtener todos los empleados
router.get('/empleados', obtenerEmpleados);

// Ruta para obtener un empleado por su ID
router.get('/empleado/:id', obtenerEmpleado);

// Ruta para insertar un nuevo empleado
router.post('/registrarempleado', registrarEmpleado);

// Ruta para eliminar una empleado por id
router.delete('/eliminarempleado/:id', eliminarEmpleado);

// Ruta para actualizar una categoría por su ID
router.patch('/actualizarempleado/:id', actualizarEmpleado);

export default router;