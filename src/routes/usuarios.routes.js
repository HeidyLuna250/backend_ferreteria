import { Router } from 'express';
import { obtenerUsuarios, obtenerUsuario, registrarUsuario, verificarUsuario } from '../controllers/usuarios.controller.js';

const router = Router();

// Ruta para obtener todos los usuarios.
router.get('/usuarios', obtenerUsuarios);

// Ruta para obtener un usuario por su ID.
router.get('/usuario/:user', obtenerUsuario);

// Ruta para verificar un usuario y contraseña.
router.post('/verificar', verificarUsuario);

// Ruta para insertar un nuevo usuario
router.post('/registrarusuario', registrarUsuario);

export default router;