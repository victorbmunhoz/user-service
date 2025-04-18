# User Service

Serviço de gerenciamento de usuários (docentes e alunos) para a plataforma educacional.

## Descrição

O User Service é responsável pelo gerenciamento de usuários da plataforma, incluindo professores e alunos. Ele implementa uma API RESTful para criação, leitura, atualização e exclusão de usuários, com diferentes níveis de acesso baseados em funções.

## Recursos

- Cadastro e gerenciamento de professores
- Cadastro e gerenciamento de alunos
- Filtragem de usuários por função
- Integração com o serviço de autenticação

## Tecnologias

- Node.js
- Express
- MongoDB (Mongoose)
- Jest (Testes)
- Swagger (Documentação da API)

## Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Iniciar servidor de desenvolvimento
npm run dev

# Iniciar em produção
npm start
```

## Endpoints da API

- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Buscar usuário por ID
- `POST /api/users` - Criar novo usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Remover usuário
- `GET /api/teachers` - Listar todos os professores
- `GET /api/students` - Listar todos os alunos

## Testes

```bash
npm test
``` 