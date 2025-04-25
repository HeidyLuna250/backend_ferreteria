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

// Registrar una nueva compra
export const registrarCompra = async (req, res) => {
  try {
    const { id_empleado, fecha_compra, total_compra } = req.body;

    // Validación básica de campos requeridos
    if (!id_empleado || !fecha_compra || !total_compra) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos: id_empleado, fecha_compra o total_compra.'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO Compras (id_empleado, fecha_compra, total_compra) VALUES (?, ?, ?)',
      [id_empleado, fecha_compra, total_compra]
    );

    res.status(201).json({
      id_compra: result.insertId,
      mensaje: 'Compra registrada exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar la compra.',
      error: error.message
    });
  }
};