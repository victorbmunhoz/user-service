const User = require('../models/User');

// Mock para o mongoose
jest.mock('mongoose', () => {
  const originalModule = jest.requireActual('mongoose');
  
  return {
    ...originalModule,
    connect: jest.fn(),
    model: jest.fn().mockImplementation(() => {
      return function(data) {
        return {
          ...data,
          save: jest.fn().mockResolvedValue(data)
        };
      };
    })
  };
});

describe('User Model', () => {
  let userObject;

  beforeEach(() => {
    userObject = {
      name: 'Teste da Silva',
      email: 'teste@example.com',
      role: 'teacher',
      specialization: 'Matemática',
      enrollmentNumber: null
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve criar um professor com sucesso', () => {
    const user = new User(userObject);
    expect(user.name).toBe('Teste da Silva');
    expect(user.email).toBe('teste@example.com');
    expect(user.role).toBe('teacher');
    expect(user.specialization).toBe('Matemática');
  });

  test('deve criar um aluno com sucesso', () => {
    userObject.role = 'student';
    userObject.specialization = null;
    userObject.enrollmentNumber = '12345';
    
    const user = new User(userObject);
    expect(user.name).toBe('Teste da Silva');
    expect(user.email).toBe('teste@example.com');
    expect(user.role).toBe('student');
    expect(user.enrollmentNumber).toBe('12345');
  });

  test('deve ter um campo createdAt', () => {
    const user = new User(userObject);
    expect(user.createdAt).toBeDefined();
  });

  test('deve ter um campo updatedAt', () => {
    const user = new User(userObject);
    expect(user.updatedAt).toBeDefined();
  });
}); 