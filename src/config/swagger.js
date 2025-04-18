const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Usuários',
    version: '1.0.0',
    description: 'API para gerenciamento de usuários (professores e alunos)',
    contact: {
      name: 'Equipe de Desenvolvimento'
    }
  },
  servers: [
    {
      url: 'http://localhost:3001/api',
      description: 'Servidor de Desenvolvimento'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/routes/*.js', './src/models/*.js']
};

module.exports = swaggerOptions; 