// controllers/ia.controller.js
import { pool2 } from '../db.js'; // Ajusta la ruta según tu configuración

export const consultarConIA = async (req, res) => {
  try {
    const { consultaSQL } = req.body;

    if (!consultaSQL || !consultaSQL.trim()) {
      return res.status(400).json({ mensaje: 'La consulta SQL no puede estar vacía.' });
    }

    const [filas] = await pool2.query(consultaSQL);

    res.status(200).json({
      resultados: filas,
    });
  } catch (error) {
    console.error('Error en consulta:', error);
    res.status(500).json({
      mensaje: 'Error al procesar la consulta.',
      error: error.message,
    });
  }
};