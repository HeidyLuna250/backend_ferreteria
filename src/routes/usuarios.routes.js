import { Router } from 'express';
import { obtenerUsuarios, obtenerUsuario, registrarUsuario, verificarUsuario, eliminarUsuario, actualizarUsuario } from '../controllers/usuarios.controller.js';

const router = Router();

// Ruta para obtener todos los usuarios.
router.get('/usuarios', obtenerUsuarios);

// Ruta para obtener un usuario por su ID.
router.get('/usuario/:user', obtenerUsuario);

// Ruta para verificar un usuario y contraseña.
router.post('/verificar', verificarUsuario);

// Ruta para insertar un nuevo usuario
router.post('/registrarusuario', registrarUsuario);

// Ruta para eliminar un usuario por id
router.delete('/eliminarusuario/:id', eliminarUsuario);

// Ruta para actualizar un usuario por su ID
router.patch('/actualizarusuario/:id', actualizarUsuario);

export default router;