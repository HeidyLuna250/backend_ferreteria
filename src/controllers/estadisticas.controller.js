import { pool2 } from '../db.js';

// Obtener el Total de ventas por día
export const totalVentasPorDia = async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT DATE_FORMAT(t.fecha, '%Y-%m-%d') AS dia, ROUND(SUM(hv.total_linea), 2) AS total_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY t.fecha
        ORDER BY t.fecha; `
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Total de ventas por mes
export const totalVentasPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT t.mes, ROUND(SUM(hv.total_linea),1) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY t.mes
       ORDER BY t.mes;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron ventas mensuales.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener ventas mensuales.', error });
  }
};

// Total de ventas por año
export const totalVentasPorAnio = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT t.año, ROUND(SUM(hv.total_linea), 2) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY t.año
       ORDER BY t.año;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron ventas por año.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener ventas anuales.', error });
  }
};

// Total de ventas por empleado
export const totalVentasPorEmpleado = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido, ROUND(SUM(hv.total_linea),2) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido
       ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron ventas por empleado.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener ventas por empleado.', error });
  }
};

// Cantidad de ventas por empleado
export const cantidadVentasPorEmpleado = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido, COUNT(DISTINCT hv.id_venta) AS cantidad_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido
       ORDER BY cantidad_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron datos de cantidad de ventas por empleado.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener cantidad de ventas por empleado.', error });
  }
};

// Total de ventas por empleado y mes
export const ventasEmpleadoPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido, t.año, t.mes, SUM(hv.total_linea) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido, t.año, t.mes
       ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron ventas por empleado y mes.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener ventas por empleado y mes.', error });
  }
};

// Total de ventas por clientes 
export const totalVentasPorClientes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido, ROUND(SUM(hv.total_linea),2) AS total_compras
        FROM Hecho_Ventas hv
        JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
        GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido
        ORDER BY total_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Total de compras por clientes
export const totalComprasPorClientes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido, COUNT(DISTINCT hv.id_venta) AS cantidad_compras
        FROM Hecho_Ventas hv
        JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
        GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido
        ORDER BY cantidad_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Total de compras por clientes y mes
export const totalComprasPorClientesMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido, t.año, t.mes, SUM(hv.total_linea) AS total_compras
        FROM Hecho_Ventas hv
        JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido, t.año, t.mes
        ORDER BY t.año, t.mes, total_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Productos más vendidos por cantidad
export const ProductosMasVendidosPorCantidad = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido, ROUND(SUM(hv.total_linea),2) AS total_compras
        FROM Hecho_Ventas hv
        JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
        GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido
        ORDER BY total_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Productos más vendidos por total
export const ProductosMasVendidosPorTotal = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, SUM(hv.total_linea) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
        FROM Hecho_Ventas hv
        JOIN Dim_Productos p ON hv.id_producto = p.id_producto
        GROUP BY p.id_producto, p.nombre_producto
        ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

//Ventas de productos por mes
export const ProductosVendidosPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, t.año, t.mes, SUM(hv.cantidad) AS cantidad_vendida, SUM(hv.total_linea) AS total_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Productos p ON hv.id_producto = p.id_producto
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY p.id_producto, p.nombre_producto, t.año, t.mes
        ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Total de ventas por categorias
export const TotalVentasPorCategorias = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_categoria, SUM(hv.total_linea) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
        FROM Hecho_Ventas hv
        JOIN Dim_Productos p ON hv.id_producto = p.id_producto
        GROUP BY p.nombre_categoria
        ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Total de ventas por categorias y mes
export const TotalVentasPorCategoriasMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_categoria, t.año, t.mes, SUM(hv.total_linea) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
        FROM Hecho_Ventas hv
        JOIN Dim_Productos p ON hv.id_producto = p.id_producto
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY p.nombre_categoria, t.año, t.mes
        ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Productos con bajo stock menor a 50
export const ProductosBajoStock = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, p.stock
        FROM Dim_Productos p
        WHERE p.stock < 50
        ORDER BY p.stock ASC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Stock por categoria
export const stockPorCategoria = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_categoria, SUM(p.stock) AS stock_total
        FROM Dim_Productos p
        GROUP BY p.nombre_categoria
        ORDER BY stock_total DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Ventas por cliente, empleado y mes
export const totalVentasPorClienteEmpleadoMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre AS cliente_nombre, c.primer_apellido AS cliente_apellido,
       e.primer_nombre AS empleado_nombre, e.primer_apellido AS empleado_apellido,
       t.año, t.mes, SUM(hv.total_linea) AS total_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
        JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY c.id_cliente, c.primer_nombre, c.primer_apellido,
                e.id_empleado, e.primer_nombre, e.primer_apellido,
                t.año, t.mes
        ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Ventas por categoria, empleado y mes
export const totalVentasPorCategoriaEmpleadoMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_categoria, e.primer_nombre AS empleado_nombre, e.primer_apellido AS empleado_apellido,
       t.año, t.mes, SUM(hv.total_linea) AS total_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Productos p ON hv.id_producto = p.id_producto
        JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY p.nombre_categoria, e.id_empleado, e.primer_nombre, e.primer_apellido,
                t.año, t.mes
        ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Ventas por cliente, categoría y mes
export const totalVentasPorCategoriaClienteMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre AS cliente_nombre, c.primer_apellido AS cliente_apellido,
       p.nombre_categoria, t.año, t.mes, SUM(hv.total_linea) AS total_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
        JOIN Dim_Productos p ON hv.id_producto = p.id_producto
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY c.id_cliente, c.primer_nombre, c.primer_apellido,
                p.nombre_categoria, t.año, t.mes
        ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Promedio de ventas por empleado
export const promedioVentasPorEmpleado = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido,
       AVG(hv.total_linea) AS promedio_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
        GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido
        ORDER BY promedio_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Promedio de ventas por empleado y mes
export const promedioVentasPorEmpleadoMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido,
       t.año, t.mes, AVG(hv.total_linea) AS promedio_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido,
                t.año, t.mes
        ORDER BY t.año, t.mes, promedio_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Clientes que compran más frecuentemente
export const ClientesFrecuentes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido,
       COUNT(DISTINCT hv.id_venta) AS cantidad_compras,
       SUM(hv.total_linea) AS total_compras
        FROM Hecho_Ventas hv
        JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
        GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido
        HAVING COUNT(DISTINCT hv.id_venta) > 1
        ORDER BY cantidad_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Clientes frecuentes por mes
export const ClientesFrecuentesPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido,
       t.año, t.mes, COUNT(DISTINCT hv.id_venta) AS cantidad_compras
        FROM Hecho_Ventas hv
        JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido,
                t.año, t.mes
        HAVING COUNT(DISTINCT hv.id_venta) > 1
        ORDER BY t.año, t.mes, cantidad_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Productos mas comprados por clientes
export const ProductosMasCompradosPorClientes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido,
       p.nombre_producto, SUM(hv.cantidad) AS cantidad_comprada,
       SUM(hv.total_linea) AS total_gastado
        FROM Hecho_Ventas hv
        JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
        JOIN Dim_Productos p ON hv.id_producto = p.id_producto
        GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido,
                p.id_producto, p.nombre_producto
        ORDER BY total_gastado DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Cantegorias mas compradas por clientes
export const categoriasMasCompradasPorClientes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido,
       p.nombre_categoria, SUM(hv.cantidad) AS cantidad_comprada,
       SUM(hv.total_linea) AS total_gastado
        FROM Hecho_Ventas hv
        JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
        JOIN Dim_Productos p ON hv.id_producto = p.id_producto
        GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido,
                p.nombre_categoria
        ORDER BY total_gastado DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Total de ventas por dia de la semana
export const totalVentasPorDiaSemana = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT t.dia_semana, SUM(hv.total_linea) AS total_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY t.dia_semana
        ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Total de ventas por categoria y dia de la semana
export const totalVentasPorCategoriaDiaSemana = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_categoria, t.dia_semana, SUM(hv.total_linea) AS total_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Productos p ON hv.id_producto = p.id_producto
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY p.nombre_categoria, t.dia_semana
        ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Productos con mayor rotación (Ventas/Stock inicial)
export const productosMayorRotacion = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, p.stock AS stock_inicial,
       SUM(hv.cantidad) AS total_vendido,
       (SUM(hv.cantidad) / p.stock) AS tasa_rotacion
        FROM Hecho_Ventas hv
        JOIN Dim_Productos p ON hv.id_producto = p.id_producto
        WHERE p.stock > 0
        GROUP BY p.id_producto, p.nombre_producto, p.stock
        ORDER BY tasa_rotacion DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

// Categorías con mayor rotación
export const categoriasMayorRotacion = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_categoria,
       SUM(p.stock) AS stock_total,
       SUM(hv.cantidad) AS total_vendido,
       (SUM(hv.cantidad) / SUM(p.stock)) AS tasa_rotacion
        FROM Hecho_Ventas hv
        JOIN Dim_Productos p ON hv.id_producto = p.id_producto
        GROUP BY p.nombre_categoria
        HAVING SUM(p.stock) > 0
        ORDER BY tasa_rotacion DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};