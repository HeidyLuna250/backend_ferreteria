import { pool } from '../db.js';

// Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Clientes');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los clientes.',
      error: error
    });
  }
};

// Obtener un cliente por su id
export const obtenerCliente = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Clientes WHERE id_cliente = ?', [req.params.id]);
    
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} del cliente no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del cliente.',
      error: error
    });
  }
};

// Registrar un nuevo cliente
export const registrarCliente = async (req, res) => {
  try {
    const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, direccion, cedula } = req.body;

    const [result] = await pool.query(
      'INSERT INTO Clientes (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, direccion, cedula) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, direccion, cedula]
    );

    res.status(201).json({ id_cliente: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el cliente.',
      error: error
    });
  }
};

// Eliminar un cliente por su ID
export const eliminarCliente = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Clientes WHERE id_cliente = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el cliente. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el cliente.',
      error: error
    });
  }
};

// Actualizar un cliente por su ID (parcial o completa)
export const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE Clientes SET ? WHERE id_cliente = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El cliente con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar el cliente.',
      error: error,
    });
  }
};

