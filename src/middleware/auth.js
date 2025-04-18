const axios = require('axios');
const logger = require('../config/logger');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Token de autenticação não fornecido' });
    }

    // Verifica token com o auth-service
    const response = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/api/auth/verify`,
      {},
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );

    if (!response.data || !response.data.user) {
      throw new Error('Token inválido');
    }

    // Adiciona informações do usuário na requisição
    req.user = response.data.user;
    req.token = token;
    
    next();
  } catch (error) {
    logger.error(`Erro na autenticação: ${error.message}`);
    res.status(401).json({ message: 'Por favor, autentique-se' });
  }
};

module.exports = auth; 