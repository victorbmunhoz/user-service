const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  role: {
    type: String,
    required: true,
    enum: ['student', 'teacher'],
    default: 'student'
  },
  // Campos específicos para professores
  specialization: {
    type: String,
    required: function() { return this.role === 'teacher'; }
  },
  // Campos específicos para alunos
  enrollmentNumber: {
    type: String,
    required: function() { return this.role === 'student'; }
  },
  // Campos comuns adicionais
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para atualizar o updatedAt antes de salvar
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema); 