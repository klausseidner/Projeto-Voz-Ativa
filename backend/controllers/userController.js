///////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável por controlar usuarios
///////////////////////////////////////////////////////////////////////////////////////////////////////
const userModel = require('../models/userModel'); // Importando o modelo de usuário

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para registrar um usuário
///////////////////////////////////////////////////////////////////////////////////////////////////////
async function registerUser(req, res) {
  try { // Tentando registrar o usuário
    const userData = req.body; // Recebendo os dados do usuário
    const result = await userModel.createUser(userData); // Criando o usuário no banco de dados
    res.status(201).json({ message: 'Usuário registrado com sucesso!', result }); // Retornando o resultado
  } catch (error) { // Caso ocorra algum erro durante o registro
    res.status(500).json({ message: 'Erro ao registrar usuário', error }); // Retornando o resultado
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para atualizar o perfil do usuário
///////////////////////////////////////////////////////////////////////////////////////////////////////
async function updateProfile(req, res) {
  const userId = req.params.id; // Recebendo o ID do usuário
  const data = req.body; // Recebendo os dados do usuário para atualizar o perfil
  try { // Tentando atualizar o perfil do usuário
    const result = await userModel.updateProfile(userId, data); // Atualizando o perfil do usuário no banco de dados
    res.status(200).json({ message: 'Perfil atualizado com sucesso!', result }); // Retornando o resultado
  } catch (error) { // Caso ocorra algum erro durante a atualização do perfil
    res.status(500).json({ message: 'Erro ao atualizar perfil', error }); // Retornando o resultado
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para login
///////////////////////////////////////////////////////////////////////////////////////////////////////
async function loginUser(req, res) {
  const { email, senha } = req.body; // Recebendo os dados de login do usuário
  try { // Tentando fazer login do usuário
    const user = await userModel.findUserByEmail(email); // Buscando o usuário no banco de dados
    if (user && user.senha === senha) { // Adicione uma verificação mais segura para senhas
      res.status(200).json({ message: 'Login bem-sucedido!', user }); // Retornando o resultado
    } else { // Caso as credenciais não sejam válidas
      res.status(401).json({ message: 'Credenciais inválidas' }); // Retornando o resultado
    }
  } catch (error) { // Caso ocorra algum erro durante o login
    res.status(500).json({ message: 'Erro ao fazer login', error }); // Retornando o resultado
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para obter todos os usuários
///////////////////////////////////////////////////////////////////////////////////////////////////////
async function getAllUsers(req, res) {
  try { // Tentando obter todos os usuários
    const users = await userModel.getAllUsers(); // Obtendo todos os usuários do banco de dados
    res.status(200).json(users); // Retornando o resultado
  } catch (error) { // Caso ocorra algum erro durante a obtenção dos usuários
    res.status(500).json({ message: 'Erro ao obter usuários', error }); // Retornando o resultado
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para deletar um usuário
///////////////////////////////////////////////////////////////////////////////////////////////////////
async function deleteUser(req, res) {
  const userId = req.params.id; // Recebendo o ID do usuário
  try { // Tentando deletar o usuário
    await userModel.deleteUser(userId); // Deletando o usuário do banco de dados
    res.status(200).json({ message: 'Usuário deletado com sucesso!' }); // Retornando o resultado
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error }); // Retornando o resultado
  }
}

// Exportando as funções
module.exports = { 
  registerUser,
  updateProfile,
  loginUser,
  getAllUsers,
  deleteUser,
};
