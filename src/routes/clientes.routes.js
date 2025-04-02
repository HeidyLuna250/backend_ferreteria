import { Router } from 'express';
import { obtenerClientes, obtenerCliente, registrarCliente } from '../controllers/clientes.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/clientes', obtenerClientes);

// Ruta para obtener un cliente por su ID
router.get('/cliente/:id', obtenerCliente);

// Ruta para insertar un nuevo cliente
router.post('/registrarcliente', registrarCliente);

export default router;
