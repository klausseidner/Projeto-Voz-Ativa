///////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo de rotas do usuário
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para validar dados do usuário
///////////////////////////////////////////////////////////////////////////////////////////////////////
function validateUserData(data) {
    const { nome, email, senha, cpf, telefone, endereco } = data; // Destructuring dos dados do usuário
    return nome && email && senha && cpf && telefone && endereco; // Valida se todos os dados são fornecidos
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Rota para registrar um novo usuário
///////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/register', async (req, res) => {
    const { nome, email, senha, cpf, telefone, endereco, isAdmin } = req.body; // Captura os dados do formulário
    // Valida se todos os dados do formulário estão preenchidos
    if (!validateUserData(req.body)) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' }); // Retorna um erro se algum campo não for preenchido
    }
    try {
        const hashedSenha = await bcrypt.hash(senha, 10);
        const nivelUsuario = isAdmin ? 1 : 2; // Converte isAdmin para nível de usuário
        const sql = 'INSERT INTO usuarios (nome, email, senha, cpf, telefone, endereco, nivel) VALUES (?, ?, ?, ?, ?, ?, ?)'; // Monta a query SQL para inserir um novo usuário
        await db.query(sql, [nome, email, hashedSenha, cpf, telefone, endereco, nivelUsuario]); // Executa a query SQL
        res.status(201).json({ message: 'Usuário registrado com sucesso!' }); // Retorna um sucesso se o usuário for registrado
    } catch (error) { // Se ocorrer um erro ao registrar o usuário
        console.error('Erro ao registrar usuário:', error); // Loga o erro
        log(`Erro ao registrar usuário: ${error.message}`); // Salva o erro
        res.status(500).json({ error: 'Erro ao registrar usuário no banco de dados.' }); // Retorna um erro se ocorrer um erro ao registrar o usuário
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////  
// Rota para login de usuário
///////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/login', async (req, res) => {
    const { email, senha } = req.body; // Captura os dados do formulário de login
    // Valida se o email e a senha foram fornecidos
    if (!email || !senha) {
        log('Erro: Email ou senha não fornecidos.'); // Loga o erro
        return res.status(400).json({ error: 'Email e senha são obrigatórios!' }); // Retorna um erro se o email ou a senha não foram fornecidos
    }
    try { // Executa a query SQL para buscar o usuário pelo email
        const [results] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]); // Executa a query SQL
        // Verifica se o email existe no banco de dados
        if (results.length === 0) {
            log(`Falha de login: Email não encontrado - ${email}`); // Loga o erro
            return res.status(401).json({ error: 'Email ou senha inválidos.' }); // Retorna um erro se o email não existe no banco de dados
        }
        const user = results[0]; // Captura o usuário do resultado da query
        const isMatch = await bcrypt.compare(senha, user.senha); // Compara a senha fornecida com a senha hash do banco de dados
        // Verifica se a senha fornecida é válida
        if (!isMatch) {
            log(`Falha de login: Senha incorreta para o email - ${email}`); // Loga o erro
            return res.status(401).json({ error: 'Email ou senha inválidos.' }); // Retorna um erro se a senha fornecida é inválida
        }
        const isAdmin = user.nivel === 1; // Considera nível 1 como administrador
        res.json({ // Retorna os dados do usuário logado
            message: 'Login realizado com sucesso!', // Retorna um sucesso se o login for realizado com sucesso
            user: {
                nome: user.nome, // Captura o nome do usuário
                email: user.email, // Captura o email do usuário
                nivel: user.nivel, // Captura o nível do usuário
                isAdmin // Adiciona esta propriedade
            }
        });
    } catch (err) { // Se ocorrer um erro ao acessar o banco de dados
        console.error('Erro ao acessar o banco de dados:', err); // Loga o erro
        log(`Erro ao acessar o banco de dados: ${err.message}`); // Salva o erro
        res.status(500).json({ error: 'Erro ao acessar o banco de dados.' }); // Retorna um erro se ocorrer um erro ao acessar o banco de dados
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Rota para obter todos os usuários
///////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/usuarios', async (req, res) => {
    try { // Executa a query SQL para buscar todos os usuários
        const [results] = await db.query('SELECT * FROM usuarios'); // Executa a query SQL
        res.json(results); // Retorna os dados dos usuários
    } catch (err) { // Se ocorrer um erro ao executar a query
        console.error('Erro ao executar a query:', err); // Loga o erro
        log(`Erro ao executar a query: ${err.message}`); // Salva o erro
        res.status(500).json({ error: 'Erro ao obter dados.' }); // Retorna um erro se ocorrer um erro ao executar a query
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Rota para login com Google
///////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/login/google', async (req, res) => {
    const { id_token } = req.body; // Captura o token do Google
    // Verifica se o token do Google é fornecido
    if (!id_token) {
        return res.status(400).json({ error: 'Token do Google é obrigatório!' }); // Retorna um erro se o token do Google não for fornecido
    }
    try { // Executa a verificação do token do Google
        const ticket = await googleClient.verifyIdToken({ // Verifica o token do Google
            idToken: id_token, // Token do Google
            audience: '119836842505-voh13dm2f4t8eb7toll5g3st288sp7gg.apps.googleusercontent.com', // Substitua pelo seu Client ID
        });
        const payload = ticket.getPayload(); // Captura os dados do payload do token do Google
        const email = payload.email; // Captura o email do usuário do payload do token do Google
        const nome = payload.name; // Captura o nome do usuário do payload do token do Google
        const [results] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]); // Verifica se o usuário já existe no banco de dados
        // Verifica se o usuário existe no banco de dados
        if (results.length === 0) {
            const sql = 'INSERT INTO usuarios (nome, email, senha, nivel) VALUES (?, ?, ?, ?)'; // Monta a query SQL para inserir um novo usuário
            await db.query(sql, [nome, email, null, 2]); // Define o nível como 2 (Usuário normal)
        }
        const [userResults] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]); // Executa a query SQL para buscar o usuário pelo email
        const user = userResults[0]; // Captura o usuário do resultado da query
        const isAdmin = user.nivel === 1; // Considera nível 1 como administrador
        res.json({ // Retorna os dados do usuário logado
            message: 'Login com Google realizado com sucesso!', // Retorna um sucesso se o login com Google for realizado com sucesso
            user: {
                nome: user.nome, // Captura o nome do usuário
                email: user.email, // Captura o email do usuário
                nivel: user.nivel, // Captura o nível do usuário
                isAdmin // Adiciona esta propriedade
            }
        });
    } catch (error) { // Se ocorrer um erro ao verificar o token do Google
        console.error('Erro ao verificar token do Google:', error); // Loga o erro
        return res.status(401).json({ error: 'Token inválido ou expirado.' }); // Retorna um erro se o token do Google é inválido ou expirado
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Rota para logout do usuário
///////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/logout', (req, res) => {
    res.json({ message: 'Logout realizado com sucesso!' }); // Retorna um sucesso se o logout for realizado com sucesso
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Rota para atualizar perfil do usuário
///////////////////////////////////////////////////////////////////////////////////////////////////////
app.put('/users/:id', async (req, res) => {
    const userId = req.params.id; // ID do usuário a ser atualizado
    const { name, email, matricula, profilePicture } = req.body; // Campos a serem atualizados
    // Valida se todos os campos foram fornecidos
    if (!name || !email || !matricula) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' }); // Retorna um erro se todos os campos não foram fornecidos
    }
    try { // Executa a query SQL para atualizar o perfil do usuário
        const sql = 'UPDATE users SET name = ?, email = ?, matricula = ?, profilePicture = ? WHERE id = ?'; // Monta a query SQL para atualizar o perfil do usuário
        await db.query(sql, [name, email, matricula, profilePicture, userId]); // Executa a query SQL
        res.status(200).json({ message: 'Perfil atualizado com sucesso!' }); // Retorna um sucesso se o perfil for atualizado com sucesso
    } catch (error) { // Se ocorrer um erro ao executar a query
        console.error('Erro ao atualizar perfil:', error); // Loga o erro
        log(`Erro ao atualizar perfil: ${error.message}`); // Salva o erro
        res.status(500).json({ error: 'Erro ao atualizar perfil no banco de dados.' }); // Retorna um erro se ocorrer um erro ao executar a query
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////