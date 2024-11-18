///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
const db = require('../config/db'); // Importando a conexão com o banco de dados

///////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para buscar todas as secretárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM secretaries'); // Executando a query SQL
    return rows; // Retorna todas as secretárias
  },

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para buscar uma secretária por ID
///////////////////////////////////////////////////////////////////////////////////////////////////////
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM secretaries WHERE id = ?', [id]); // Executando a query SQL
    return rows[0]; // Retorna a secretária ou undefined
  },

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para criar uma nova secretária
///////////////////////////////////////////////////////////////////////////////////////////////////////
  create: async (name, email) => {
    const [result] = await db.execute( // Executando a query SQL para inserir uma nova secretária
      'INSERT INTO secretaries (name, email) VALUES (?, ?)', // A query SQL
      [name, email] // Parâmetros da query SQL
    );
    return result.insertId; // Retorna o ID da secretária criada
  },

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para atualizar uma secretária
///////////////////////////////////////////////////////////////////////////////////////////////////////
  update: async (id, name, email) => {
    const [result] = await db.execute( // Executando a query SQL para atualizar uma secretária
      'UPDATE secretaries SET name = ?, email = ? WHERE id = ?', // A query SQL
      [name, email, id] // Parâmetros da query SQL
    );
    return result.affectedRows; // Retorna o número de linhas afetadas
  },

///////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para deletar uma secretária
///////////////////////////////////////////////////////////////////////////////////////////////////////
  delete: async (id) => {
    const [result] = await db.execute( // Executando a query SQL para deletar uma secretária
      'DELETE FROM secretaries WHERE id = ?', // A query SQL
      [id] // Parâmetro da query SQL
    );
    return result.affectedRows; // Retorna o número de linhas afetadas
  },
};

///////////////////////////////////////////////////////////////////////////////////////////////////////