///////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável por controlar os incidentes
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando as dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
const db = require('../config/db'); // Importando a conexão com o banco de dados

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para criar um novo incidente
///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.createIncident = async (req, res) => {
  const { title, description, status, userId } = req.body; // Recebe os dados do incidente
  // Validando se todos os campos obrigatórios estão preenchidos
  if (!title || !description || !status || !userId) {  // Retorna um erro se algum campo não está preenchido
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' }); // Retorna um erro se algum campo não está preenchido
  }
  try { // Tenta inserir o novo incidente no banco de dados
    const [result] = await db.execute( // Insere um novo incidente no banco de dados
      'INSERT INTO incidents (title, description, status, user_id) VALUES (?, ?, ?, ?)', // Substitua os valores dos placeholders com os dados do incidente
      [title, description, status, userId] // Substitua os valores dos placeholders com os dados do incidente
    );
    res.status(201).json({ message: 'Incidente criado com sucesso!', id: result.insertId }); // Retorna o ID do novo incidente
  } catch (error) { // Trata o erro ao inserir o novo incidente
    console.error('Erro ao criar incidente:', error); // Imprime o erro no console
    res.status(500).json({ message: 'Erro ao criar incidente.' }); // Retorna um erro genérico
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para listar todos os incidentes
///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getAllIncidents = async (req, res) => {
  try {  // Tenta buscar todos os incidentes no banco de dados
    const [incidents] = await db.query('SELECT * FROM incidents'); // Busca todos os incidentes no banco de dados
    res.status(200).json(incidents); // Retorna os incidentes
  } catch (error) { // Trata o erro ao buscar todos os incidentes
    console.error('Erro ao buscar incidentes:', error); // Imprime o erro no console
    res.status(500).json({ message: 'Erro ao buscar incidentes.' }); // Retorna um erro genérico
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para buscar um incidente específico pelo ID
///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getIncidentById = async (req, res) => {
  const { id } = req.params; // Recebe o ID do incidente
  try { // Tenta buscar o incidente específico pelo ID no banco de dados
    const [incident] = await db.query('SELECT * FROM incidents WHERE id = ?', [id]); // Busca o incidente específico pelo ID no banco de dados
    // Verifica se o incidente foi encontrado
    if (incident.length === 0) {
      return res.status(404).json({ message: 'Incidente não encontrado.' }); // Retorna um erro se o incidente não foi encontrado
    }
    res.status(200).json(incident[0]); // Retorna o incidente
  } catch (error) { // Trata o erro ao buscar o incidente específico pelo ID
    console.error('Erro ao buscar incidente:', error); // Imprime o erro no console
    res.status(500).json({ message: 'Erro ao buscar incidente.' }); // Retorna um erro genérico
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Controlador para atualizar um incidente
///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.updateIncident = async (req, res) => {
  const { id } = req.params; // Recebe o ID do incidente
  const { title, description, status } = req.body; // Recebe os dados do incidente
  // Valida se todos os campos obrigatórios estão preenchidos
  if (!title || !description || !status) { 
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' }); // Retorna um erro se algum campo não está preenchido
  }
  try { // Tenta atualizar o incidente no banco de dados
    const [result] = await db.execute( // Atualiza o incidente no banco de dados
      'UPDATE incidents SET title = ?, description = ?, status = ? WHERE id = ?', // Substitua os valores dos placeholders com os dados do incidente
      [title, description, status, id] // Substitua os valores dos placeholders com os dados do incidente
    );
    // Verifica se o incidente foi atualizado
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Incidente não encontrado.' }); // Retorna um erro se o incidente não foi encontrado
    }
    res.status(200).json({ message: 'Incidente atualizado com sucesso!' }); // Retorna o ID do novo incidente
  } catch (error) { // Trata o erro ao atualizar o incidente
    console.error('Erro ao atualizar incidente:', error); // Imprime o erro no console
    res.status(500).json({ message: 'Erro ao atualizar incidente.' }); // Retorna um erro genérico
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Controlador para excluir um incidente
///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.deleteIncident = async (req, res) => {
  const { id } = req.params; // Recebe o ID do incidente
  try { // Tenta excluir o incidente no banco de dados
    const [result] = await db.execute('DELETE FROM incidents WHERE id = ?', [id]); // Exclui o incidente no banco de dados
    // Verifica se o incidente foi excluído
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Incidente não encontrado.' }); // Retorna um erro se o incidente não foi encontrado
    }
    res.status(200).json({ message: 'Incidente excluído com sucesso!' }); // Retorna o ID do novo incidente
  } catch (error) { // Trata o erro ao excluir o incidente
    console.error('Erro ao excluir incidente:', error); // Imprime o erro no console
    res.status(500).json({ message: 'Erro ao excluir incidente.' }); // Retorna um erro genérico
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////