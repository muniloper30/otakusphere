import express from 'express';
import { getUsuarios, getUsuarioById, createUsuario, updateUser, deleteUser, loginUsuario } from '../controllers/users.controller.js';
//Variable para la conexión a la base de datos
const router = express.Router();

// Rutas para la gestión de usuarios
router.get('/', getUsuarios); // Obtener todos los usuarios
router.get('/:id', getUsuarioById); // Obtener un usuario por ID
router.post('/', createUsuario); // Crear un nuevo usuario
router.put('/:id', updateUser); // Actualizar un usuario por ID
router.delete('/:id', deleteUser); // Eliminar un usuario por ID

//Rutas para el login y registro de usuarios
router.post('/login', loginUsuario); // Iniciar sesión


export default router;
