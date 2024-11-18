///////////////////////////////////////////////////////////////////////////////////////////////////////
// Aquivo de Modelo de Agendamento
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
const db = require('../config/db'); // Importando a conexão com o banco de dados

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Criar um novo agendamento
///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.createAppointment = async (req, res) => {
    const { secretary_id, date, time, email } = req.body; // Recebendo os dados do agendamento
    // Validando os dados do agendamento
    if (!secretary_id || !date || !time || !email) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' }); // Retornando o resultado se algum campo não foi preenchido
    }
    try { // Tentando criar o agendamento
        const [existingAppointment] = await db.query( // Verificando se já existe um agendamento com os dados fornecidos
            'SELECT * FROM appointments WHERE secretary_id = ? AND appointment_date = ? AND appointment_time = ?', // Query para verificar se já existe um agendamento
            [secretary_id, date, time] // Parâmetros da query
        );
        // Verificando se já existe um agendamento com os dados fornecidos
        if (existingAppointment.length > 0) {
            return res.status(409).json({ message: 'Horário já está ocupado.' }); // Retornando o resultado se já existe um agendamento com os dados fornecidos
        }
        await db.query( // Query para inserir um novo agendamento
            'INSERT INTO appointments (secretary_id, appointment_date, appointment_time, email) VALUES (?, ?, ?, ?)', // Parâmetros da query
            [secretary_id, date, time, email] // Parâmetros da query
        );
        res.status(201).json({ message: 'Agendamento criado com sucesso!' }); // Retornando o resultado se o agendamento foi criado com sucesso
    } catch (error) { // Caso ocorra algum erro durante a criação do agendamento
        console.error(error); // Retornando o resultado se ocorrer um erro durante a criação do agendamento
        res.status(500).json({ message: 'Erro ao criar agendamento' }); // Retornando o resultado se ocorrer um erro durante a criação do agendamento
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Listar agendamentos do usuário
///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getMyAppointments = async (req, res) => {
    const { userEmail } = req.query; // Recebendo o email do usuário
    try { // Tentando buscar os agendamentos do usuário
        const [appointments] = await db.execute( // Query para buscar os agendamentos do usuário
            'SELECT * FROM appointments WHERE user_email = ?', // Parâmetros da query
            [userEmail] // Parâmetros da query
        );
        res.json(appointments); // Retornando os resultados se os agendamentos foram buscados com sucesso
    } catch (error) { // Caso ocorra algum erro durante a busca dos agendamentos
        res.status(500).json({ message: 'Erro ao buscar agendamentos', error }); // Retornando o resultado se ocorrer um erro durante a busca dos agendamentos
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Cancelar um agendamento
///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.cancelAppointment = async (req, res) => {
  const { id } = req.params; // Recebendo o ID do agendamento
    try { // Tentando cancelar o agendamento
        const [result] = await db.execute('DELETE FROM appointments WHERE id = ?', [id]); // Query para cancelar o agendamento
        // Verificando se o agendamento foi cancelado com sucesso
        if (result.affectedRows > 0) {
            res.json({ message: 'Agendamento cancelado com sucesso!' }); // Retornando o resultado se o agendamento foi cancelado com sucesso
        } else { // Caso o agendamento não seja encontrado
            res.status(404).json({ message: 'Agendamento não encontrado' }); // Retornando o resultado se o agendamento não foi encontrado
        }
    } catch (error) { // Caso ocorra algum erro durante a cancelação do agendamento
        res.status(500).json({ message: 'Erro ao cancelar o agendamento', error }); // Retornando o resultado se ocorrer um erro durante a cancelação do agendamento
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = Appointment; // Exportando o módulo de agendamento

///////////////////////////////////////////////////////////////////////////////////////////////////////