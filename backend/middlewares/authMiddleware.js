///////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável pelos Middlewares
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando as dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
const jwt = require('jsonwebtoken'); // Importando o pacote para verificar tokens JWT
const secretKey = process.env.JWT_SECRET || 'secret_key'; // Defina sua chave secreta de JWT no .env
const db = require('../config/db'); // Importando a conexão com o banco de dados

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Middleware para verificar se o usuário está autenticado
///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // Aqui está a definição da variável token
  console.log('Token recebido:', token); // Log para depuração
  // Verifica se o token foi fornecido e se é válido
  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido.' }); // Retorna um erro se o token não foi fornecido
  }
  const bearerToken = token.split(' ')[1]; // Caso o token venha como 'Bearer <token>'
  jwt.verify(bearerToken, secretKey, (err, decoded) => { // Verifica se o token é válido
    // Caso o token seja inválido ou expirado, retorna um erro
    if (err) {
      return res.status(401).json({ message: 'Token inválido ou expirado.' }); // Retorna um erro se o token é inválido
    }
    req.user = decoded; // Armazena o usuário decodificado para uso nas rotas
    next(); // Chama o próximo middleware ou a rota
  });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Middleware para verificar se o usuário é administrador
///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.verifyAdmin = (req, res, next) => {
  // Presume-se que no token decodificado haja uma propriedade `isAdmin` que defina o nível de acesso
  if (req.user && req.user.isAdmin) {
    next(); // Chama o próximo middleware ou a rota
  } else { // Caso o usuário não seja administrador, retorna um erro
    return res.status(403).json({ message: 'Acesso negado. Requer privilégios de administrador.' }); // Retorna um erro se o usuário não é administrador
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////