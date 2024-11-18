///////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável por inicializar o banco de dados e iniciar o Express.js
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando as dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
require('dotenv').config(); // Para carregar variáveis de ambiente
const mysql = require('mysql2/promise'); // Para conectar ao MySQL
const { log } = require('../utils/logger'); // Para logar eventos

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Configuração da conexão com o banco de dados
///////////////////////////////////////////////////////////////////////////////////////////////////////
const dbConfig = { // Coloque os dados do seu banco de dados aqui
  host: 'localhost', // Coloque o endereço do seu host aqui
  user: 'root', // Coloque o nome do seu usuário aqui
  password: '', // Coloque sua senha aqui
  database: 'dbvozativa', // Coloque o nome do seu banco de dados aqui
};

let db; // Variável para armazenar a conexão com o banco de dados

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Inicializando a conexão com o banco de dados
///////////////////////////////////////////////////////////////////////////////////////////////////////
async function initializeDb() {
  try { // Cria a conexão com o banco de dados
    db = await mysql.createConnection(dbConfig); // Substitua os dados do seu banco de dados aqui
    console.log('Conexão com o banco de dados estabelecida com sucesso.'); // Substitua o log() com o seu método de log
  } catch (err) { // Exibe o erro e o loga
    console.error('Erro ao conectar no banco de dados: ', err); // Substitua o log() com o seu método de log
    log(`Erro ao conectar no banco de dados: ${err.message}`); // Substitua o log() com o seu método de log
  }
}

module.exports = { db, initializeDb }; // Exportando a conexão com o banco de dados e a função para inicializar a conexão

///////////////////////////////////////////////////////////////////////////////////////////////////////