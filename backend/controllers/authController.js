///////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável por lidar com as rotas do login
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Importando as dependências necessárias
///////////////////////////////////////////////////////////////////////////////////////////////////////
const db = require('../config/db'); // Importando a conexão com o banco de dados
const bcrypt = require('bcrypt'); // Para hashing de senhas
const jwt = require('jsonwebtoken'); // Para gerar tokens JWT

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Login
///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.login = async (req, res) => {
    const { email, password } = req.body; // Recebe os dados do login

    if (!email || !password) { // Verifica se os dados estão presentes
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' }); // Verifica se os dados estão presentes
    }

    try { // Tenta buscar o usuário no banco de dados
        const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]); // Busca o usuário no banco de dados
        if (user.length === 0) { // Verifica se o usuário não foi encontrado
            return res.status(401).json({ message: 'Usuário não encontrado.' }); // Retorna um erro se o usuário não foi encontrado
        }

        // Verifica a senha
        const isMatch = await bcrypt.compare(password, user[0].password); // Compara a senha fornecida com a senha do banco de dados
        if (!isMatch) { // Verifica se a senha não é válida
            return res.status(401).json({ message: 'Senha incorreta.' }); // Retorna um erro se a senha não é válida
        }

        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Gera um token JWT
        res.status(200).json({ message: 'Login bem-sucedido!', token }); // Retorna um token JWT se o login for bem-sucedido
    } catch (error) { // Trata o erro do login
        console.error('Erro no login:', error); // Imprime o erro no console
        res.status(500).json({ message: 'Erro ao realizar login.' }); // Retorna um erro genérico
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
