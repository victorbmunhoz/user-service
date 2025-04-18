const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// Rotas gerais de usuários (requer autenticação)
router.get('/', auth, userController.getAllUsers);
router.get('/:id', auth, userController.getUserById);
router.post('/', auth, checkRole(['admin']), userController.createUser);
router.put('/:id', auth, checkRole(['admin']), userController.updateUser);
router.delete('/:id', auth, checkRole(['admin']), userController.deleteUser);

// Rotas para professores
router.get('/role/teachers', auth, userController.getAllTeachers);

// Rotas para alunos
router.get('/role/students', auth, userController.getAllStudents);

module.exports = router; 