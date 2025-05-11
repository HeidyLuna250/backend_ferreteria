import { Router } from 'express';
import { obtenerComprasConDetalles, obtenerCompras, eliminarCompra, registrarCompra } from '../controllers/compras.controller.js';

const router = Router();

// Ruta para obtener todas las compras con detalles
router.get('/compras', obtenerComprasConDetalles);

// Ruta para obtener todas las compras
router.get('/obtenercompras', obtenerCompras);

// Ruta para eliminar una compra
router.delete('/eliminarcompra/:id_compra', eliminarCompra);

// Ruta para registrar una nueva compra
router.post('/registrarcompra', registrarCompra);

export default router;