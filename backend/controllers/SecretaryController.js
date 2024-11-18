///////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável por controlar as secretarias
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando as dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
const Secretary = require('../models/secretaryModel'); // Importando o modelo da secretária
const db = require('../config/db'); // Importando a conexão com o banco de dados

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Criar uma secretária
///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.createSecretary = async (req, res) => {
    const { name, email } = req.body; // Exemplo de campos
    // Valida se os campos estão presentes e não estão vazios
    if (!name || !email) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' }); // Retorna um erro se os campos estão vazios
    }
    try { // Tenta inserir a secretária no banco de dados
        const [result] = await db.execute( // Insere a secretaria no banco de dados
            'INSERT INTO secretaries (name, email) VALUES (?, ?)', // Campos do banco de dados
            [name, email] // Valores para os campos
        );
        res.status(201).json({ message: 'Secretário criado com sucesso!', id: result.insertId }); // Retorna o ID da secretária criada
    } catch (error) { // Trata o erro ao inserir a secretaria
        console.error('Erro ao criar secretário:', error); // Imprime o erro no console
        res.status(500).json({ message: 'Erro ao criar secretário.' }); // Retorna um erro genérico
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Listar todas as secretárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getAllSecretaries = async (req, res) => {
    try { // Tenta buscar todas as secretarias do banco de dados
        const [rows] = await db.query('SELECT * FROM secretaries'); // Busca todas as secretarias do banco de dados
        res.status(200).json(rows); // Retorna as secretarias
    } catch (error) { // Trata o erro ao buscar todas as secretarias
        console.error(error); // Imprime o erro no console
        res.status(500).json({ error: 'Erro ao buscar secretários' }); // Retorna um erro genérico
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Obtendo a secretária através do ID
///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getSecretaryById = async (req, res) => {
    const { id } = req.params; // Recebe o ID da secretária
    try { // Tenta buscar a secretaria pelo ID do banco de dados
        const [rows] = await db.execute('SELECT * FROM secretaries WHERE id = ?', [id]); // Busca a secretaria pelo ID do banco de dados
        // Verifica se a secretaria foi encontrada
        if (rows.length === 0) { 
            return res.status(404).json({ message: 'Secretário não encontrado.' }); // Retorna um erro se a secretaria não foi encontrada
        }
        res.status(200).json(rows[0]); // Retorna a secretaria
    } catch (error) { // Trata o erro ao buscar a secretaria pelo ID
        console.error('Erro ao obter secretário:', error); // Imprime o erro no console
        res.status(500).json({ message: 'Erro ao obter secretário.' }); // Retorna um erro genérico
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Atualizar os dados da secretaria
///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.updateSecretary = async (req, res) => {
    const { id } = req.params; // Recebe o ID da secretaria
    const { name, email } = req.body; // Recebe os novos dados da secretaria
    // Valida se os novos dados estão presentes e não estão vazios
    if (!name || !email) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' }); // Retorna um erro se os novos dados estão vazios
    }
    try { // Tenta atualizar os dados da secretaria no banco de dados
        await db.execute('UPDATE secretaries SET name = ?, email = ? WHERE id = ?', [name, email, id]); // Atualiza os dados da secretaria no banco de dados
        res.status(200).json({ message: 'Secretário atualizado com sucesso!' }); // Retorna uma mensagem de sucesso ao atualizar a secretaria
    } catch (error) { // Trata o erro ao atualizar os dados da secretaria
        console.error('Erro ao atualizar secretário:', error); // Imprime o erro no console
        res.status(500).json({ message: 'Erro ao atualizar secretário.' }); // Retorna um erro genérico
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Excluir uma secretária cadastrada
///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.deleteSecretary = async (req, res) => {
    const { id } = req.params; // Recebe o ID da secretária
    try { // Tenta excluir a secretaria do banco de dados
        const result = await db.execute('DELETE FROM secretaries WHERE id = ?', [id]); // Exclui a secretaria do banco de dados
        // Verifica se a secretaria foi encontrada e excluída com sucesso
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: 'Secretário não encontrado.' }); // Retorna um erro se a secretaria não foi encontrada ou não foi excluída com sucesso
        }
        res.status(200).json({ message: 'Secretário excluído com sucesso!' }); // Retorna uma mensagem de sucesso ao excluir a secretaria
    } catch (error) { // Trata o erro ao excluir a secretaria do banco de dados
        console.error('Erro ao excluir secretário:', error); // Imprime o erro no console
        res.status(500).json({ message: 'Erro ao excluir secretário.' }); // Retorna um erro genérico
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////