import { pool } from '../db.js';

// Obtener todas las compras con sus detalles, mostrando nombres, IDs y subtotal
export const obtenerComprasConDetalles = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        c.id_compra,
        dc.id_detalle_compra,
        c.fecha_compra,
        CONCAT(e.primer_nombre, ' ', e.primer_apellido) AS nombre_empleado,
        p.nombre_producto,
        dc.cantidad,
        dc.precio_unitario,
        (dc.cantidad * dc.precio_unitario) AS subtotal
      FROM Compras c
      INNER JOIN Empleados e ON c.id_empleado = e.id_empleado
      INNER JOIN Detalles_Compras dc ON c.id_compra = dc.id_compra
      INNER JOIN Productos p ON dc.id_producto = p.id_producto
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las compras.',
      error: error
    });
  }
};

// Obtener todas las compras
export const obtenerCompras = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        c.id_compra,
        c.fecha_compra,
        CONCAT(e.primer_nombre, ' ', e.primer_apellido) AS nombre_empleado,
        c.total_compra
      FROM Compras c
      INNER JOIN Empleados e ON c.id_empleado = e.id_empleado
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las compras.',
      error: error
    });
  }
};

// Eliminar una compra (los detalles se eliminan automáticamente por ON DELETE CASCADE)
export const eliminarCompra = async (req, res) => {
  try {
    const { id_compra } = req.params;

    const [result] = await pool.query('DELETE FROM Compras WHERE id_compra = ?', [id_compra]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }

    res.json({ mensaje: 'Compra eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al eliminar la compra',
      error: error.message
    });
  }
};

// Registrar una nueva compra con detalles
export const registrarCompra = async (req, res) => {
  const { id_empleado, fecha_compra, total_compra, detalles } = req.body;

  try {
    const fechaCompraFormateada = new Date(fecha_compra).toISOString().slice(0, 19).replace('T', ' '); // Convierte a 'YYYY-MM-DD HH:mm:ss'
    const [compraResult] = await pool.query(
      'INSERT INTO compras (id_empleado, fecha_compra, total_compra) VALUES (?, ?, ?)',
      [id_empleado, fechaCompraFormateada, total_compra]
    );

    const id_compra = compraResult.insertId;

    for (const detalle of detalles) {
      await pool.query(
        'INSERT INTO detalles_compras (id_compra, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [id_compra, detalle.id_producto, detalle.cantidad, detalle.precio_unitario]
      );
      await pool.query(
        'UPDATE Productos SET stock = stock + ? WHERE id_producto = ?',
        [detalle.cantidad, detalle.id_producto]
      );
    }

    res.json({ mensaje: 'Compra registrada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar la compra', error: error.message });
  }
};

