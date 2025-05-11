import { Router } from 'express';
import { obtenerDetallesCompra } from '../controllers/detalles_compras.controller.js';

const router = Router();

// Ruta para obtener los detalles de una compra
router.get('/obtenerdetallescompra/:id', obtenerDetallesCompra);

export default router;