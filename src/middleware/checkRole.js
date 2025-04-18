const logger = require('../config/logger');

const checkRole = (roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Não autenticado' });
      }

      if (!roles.includes(req.user.role)) {
        logger.warn(`Acesso negado: usuário ${req.user.email} (${req.user.role}) tentou acessar um recurso restrito`);
        return res.status(403).json({ message: 'Acesso negado. Permissão insuficiente' });
      }

      next();
    } catch (error) {
      logger.error(`Erro ao verificar permissão: ${error.message}`);
      res.status(500).json({ message: 'Erro ao verificar permissão' });
    }
  };
};

module.exports = checkRole; 