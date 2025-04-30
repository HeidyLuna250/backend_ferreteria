import { Router } from 'express';
import { obtenerVentasConDetalles, obtenerVentas, eliminarVenta, registrarVenta } from '../controllers/ventas.controller.js';

const router = Router();

// Ruta para obtener todas las ventas
router.get('/ventas', obtenerVentasConDetalles);

// Ruta para obtener todas las ventas
router.get('/obtenerventas', obtenerVentas);

// Ruta para eliminar una venta
router.delete('/eliminarventa/:id_venta', eliminarVenta);

// Ruta para registrar una nueva venta
router.post('/registrarventa', registrarVenta);

export default router;
