const userController = require('../controllers/userController');
const User = require('../models/User');
const logger = require('../config/logger');

// Mock do logger
jest.mock('../config/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
}));

// Mock do modelo User
jest.mock('../models/User');

describe('User Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    test('deve retornar todos os usuários', async () => {
      const mockUsers = [
        { _id: '1', name: 'User 1', email: 'user1@example.com', role: 'teacher' },
        { _id: '2', name: 'User 2', email: 'user2@example.com', role: 'student' }
      ];
      
      User.find.mockResolvedValue(mockUsers);
      
      await userController.getAllUsers(req, res);
      
      expect(User.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUsers);
      expect(logger.info).toHaveBeenCalled();
    });

    test('deve lidar com erro', async () => {
      const error = new Error('Erro na base de dados');
      User.find.mockRejectedValue(error);
      
      await userController.getAllUsers(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Erro ao obter usuários',
        error: error.message
      }));
      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    test('deve criar um novo usuário', async () => {
      const mockUser = {
        _id: '1',
        name: 'Novo Usuário',
        email: 'novo@example.com',
        role: 'teacher',
        specialization: 'Ciências',
        save: jest.fn()
      };
      
      req.body = {
        name: 'Novo Usuário',
        email: 'novo@example.com',
        role: 'teacher',
        specialization: 'Ciências'
      };
      
      User.findOne.mockResolvedValue(null);
      User.mockImplementation(() => mockUser);
      
      await userController.createUser(req, res);
      
      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUser);
      expect(logger.info).toHaveBeenCalled();
    });

    test('deve rejeitar email já existente', async () => {
      req.body = {
        name: 'Usuário Duplicado',
        email: 'existente@example.com'
      };
      
      User.findOne.mockResolvedValue({ _id: '123', email: 'existente@example.com' });
      
      await userController.createUser(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Email já está em uso'
      }));
      expect(logger.warn).toHaveBeenCalled();
    });
  });
}); 