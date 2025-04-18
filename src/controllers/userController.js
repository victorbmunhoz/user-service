const User = require('../models/User');
const logger = require('../config/logger');

// Obter todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    logger.info(`Listagem de todos os usuários realizada com sucesso`);
    res.status(200).json(users);
  } catch (error) {
    logger.error(`Erro ao listar usuários: ${error.message}`);
    res.status(500).json({ message: 'Erro ao obter usuários', error: error.message });
  }
};

// Obter usuário por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      logger.warn(`Usuário não encontrado com ID: ${req.params.id}`);
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    logger.info(`Usuário ${user._id} obtido com sucesso`);
    res.status(200).json(user);
  } catch (error) {
    logger.error(`Erro ao buscar usuário: ${error.message}`);
    res.status(500).json({ message: 'Erro ao buscar usuário', error: error.message });
  }
};

// Criar novo usuário
exports.createUser = async (req, res) => {
  try {
    const { name, email, role, specialization, enrollmentNumber } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`Tentativa de cadastro com email já existente: ${email}`);
      return res.status(400).json({ message: 'Email já está em uso' });
    }
    
    const user = new User({
      name,
      email,
      role,
      specialization,
      enrollmentNumber
    });
    
    await user.save();
    logger.info(`Novo usuário criado com sucesso: ${user._id}`);
    res.status(201).json(user);
  } catch (error) {
    logger.error(`Erro ao criar usuário: ${error.message}`);
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
};

// Atualizar usuário
exports.updateUser = async (req, res) => {
  try {
    const { name, role, specialization, enrollmentNumber } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      logger.warn(`Tentativa de atualização de usuário inexistente: ${req.params.id}`);
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    // Email não pode ser atualizado
    if (req.body.email && req.body.email !== user.email) {
      logger.warn(`Tentativa de atualização de email: ${user.email} para ${req.body.email}`);
      return res.status(400).json({ message: 'Email não pode ser alterado' });
    }
    
    if (name) user.name = name;
    if (role) user.role = role;
    if (specialization) user.specialization = specialization;
    if (enrollmentNumber) user.enrollmentNumber = enrollmentNumber;
    
    await user.save();
    logger.info(`Usuário ${user._id} atualizado com sucesso`);
    res.status(200).json(user);
  } catch (error) {
    logger.error(`Erro ao atualizar usuário: ${error.message}`);
    res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
  }
};

// Excluir usuário
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      logger.warn(`Tentativa de exclusão de usuário inexistente: ${req.params.id}`);
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    logger.info(`Usuário ${req.params.id} removido com sucesso`);
    res.status(200).json({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    logger.error(`Erro ao excluir usuário: ${error.message}`);
    res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
  }
};

// Obter todos os professores
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' });
    logger.info(`Listagem de professores realizada com sucesso`);
    res.status(200).json(teachers);
  } catch (error) {
    logger.error(`Erro ao listar professores: ${error.message}`);
    res.status(500).json({ message: 'Erro ao obter professores', error: error.message });
  }
};

// Obter todos os alunos
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    logger.info(`Listagem de alunos realizada com sucesso`);
    res.status(200).json(students);
  } catch (error) {
    logger.error(`Erro ao listar alunos: ${error.message}`);
    res.status(500).json({ message: 'Erro ao obter alunos', error: error.message });
  }
}; 