///////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo de rotas de incidencias
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para validar dados de ocorrência
///////////////////////////////////////////////////////////////////////////////////////////////////////
function validateIncidentData(data) {
    const { protocolNumber, title, description, type, date, time, status } = data; // Valida os dados de entrada
    return protocolNumber && title && description && type && date && time && status; // Retorna true se todos os dados estão válidos
}
///////////////////////////////////////////////////////////////////////////////////////////////////////  
// Rota para registrar uma nova ocorrência
///////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/incidents', async (req, res) => {
    // Valida os dados de entrada de ocorrência
    if (!validateIncidentData(req.body)) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' }); // Retorna um erro se os dados de entrada estão inválidos
    }
    const { protocolNumber, title, description, type, date, time, status, images, assignedTo } = req.body; // Captura os dados de entrada
    try { // Cria uma nova ocorrência no banco de dados
        // Verifica se a ocorrência já existe no banco de dados
        const [existing] = await db.query('SELECT * FROM incidents WHERE protocolNumber = ?', [protocolNumber]);
        // Se a ocorrência já existe, retorna um erro
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Ocorrência com esse número de protocolo já existe!' }); // Retorna um erro se a ocorrência já existe
        }
        const sql = 'INSERT INTO incidents (protocolNumber, title, description, type, date, time, status, images, assignedTo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'; // Cria a query SQL
        const values = [protocolNumber, title, description, type, date, time, status, JSON.stringify(images), assignedTo]; // Monta os valores para a query SQL
        await db.query(sql, values); // Executa a query SQL
        return res.status(201).json({ message: 'Ocorrência registrada com sucesso!', protocolNumber }); // Retorna um status 201 e a ocorrência registrada
    } catch (error) { // Trata o erro
        console.error('Erro ao registrar ocorrência:', error.message); // Loga o erro
        log(`Erro ao registrar ocorrência: ${error.message}`); // Grava o log
        return res.status(500).json({ error: 'Erro ao registrar ocorrência no banco de dados.', details: error.message }); // Retorna um status 500 e um erro genérico
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Rota para listar ocorrência pelo número de protocolo
///////////////////////////////////////////////////////////////////////////////////////////////////////
app.put('/incidents/:protocolNumber', async (req, res) => {
    const { protocolNumber } = req.params; // Captura o número de protocolo da requisição
    const validStatuses = ['pendente', 'em andamento', 'encerrado']; // Lista de status permitidos
    // Validação dos dados da requisição
    if (!validateIncidentData(req.body)) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' }); // Retorna um erro se os dados de entrada estão inválidos
    }
    const { title, description, type, date, time, status, images, assignedTo } = req.body; // Captura os dados de entrada
    try { // Verifica se a ocorrência existe
        const [existing] = await db.query('SELECT * FROM incidents WHERE protocolNumber = ?', [protocolNumber]); // Captura a ocorrência do banco de dados
        // Se a ocorrência não existe, retorna um erro
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Ocorrência não encontrada!' }); // Retorna um erro se a ocorrência não existe
        }
        // Valida se o status fornecido é válido
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({ error: `Status inválido! Status permitidos: ${validStatuses.join(', ')}` }); // Retorna um erro se o status fornecido é inválido
        }
        // Verifica se o status é "encerrado" e mantém "encerrado" caso já esteja assim
        const currentStatus = existing[0].status.toLowerCase();
        const newStatus = currentStatus === 'encerrado' ? 'encerrado' : status.toLowerCase();
        // Só atualiza os dados se houverem mudanças (incluindo o status)
        const hasChanges = (
        title !== existing[0].title ||
        description !== existing[0].description ||
        type !== existing[0].type ||
        date !== existing[0].date ||
        time !== existing[0].time ||
        newStatus !== currentStatus ||
        JSON.stringify(images) !== JSON.stringify(existing[0].images) ||
        assignedTo !== existing[0].assignedTo
        );
        // Se não houver mudanças, retorna uma mensagem de não há alterações
        if (!hasChanges) {
            return res.status(200).json({ message: 'Nenhuma alteração detectada na ocorrência.' }); // Retorna um status 200 e uma mensagem de não há alterações
        }

        // Atualiza a ocorrência
        const sql = 'UPDATE incidents SET title = ?, description = ?, type = ?, date = ?, time = ?, status = ?, images = ?, assignedTo = ? WHERE protocolNumber = ?';
        const values = [title, description, type, date, time, newStatus, JSON.stringify(images), assignedTo, protocolNumber];
        
        await db.query(sql, values);
        
        return res.status(200).json({ message: 'Ocorrência atualizada com sucesso!', status: newStatus });

    } catch (error) {
        console.error('Erro ao atualizar ocorrência:', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar ocorrência no banco de dados.', details: error.message });
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Rota para obter todas as ocorrências
///////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/incidents', async (req, res) => {
    try { // Captura todas as ocorrências do banco de dados
        const [results] = await db.query('SELECT * FROM incidents'); // Obtém os resultados da query
        const incidents = results.map(incident => { // Converte os dados JSON para arrays
        return { // Converte os dados JSON para objetos
            ...incident, // Converte os dados de imagem para um array
            images: incident.images ? JSON.parse(incident.images) : [] // Converte os dados de status para um array
        };
    });
    res.json(incidents); // Retorna as ocorrências
    } catch (err) { // Trata o erro
        console.error('Erro ao buscar ocorrências:', err); // Loga o erro
        log(`Erro ao buscar ocorrências: ${err.message}`); // Grava o log
        res.status(500).json({ error: 'Erro ao buscar ocorrências no banco de dados.' }); // Retorna um status 500 e um erro genérico
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Rota para excluir uma ocorrência
///////////////////////////////////////////////////////////////////////////////////////////////////////
app.delete('/incidents/:id', async (req, res) => {
    const { id } = req.params; // Captura o ID da ocorrência da requisição
    try { // Verifica se a ocorrência existe
        const sql = 'DELETE FROM incidents WHERE id = ?'; // Cria a query SQL
        const [result] = await db.query(sql, [id]); // Executa a query SQL
        // Se a ocorrência não existe, retorna um erro
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Ocorrência não encontrada.' }); // Retorna um erro se a ocorrência não existe
        }
        res.json({ message: 'Ocorrência excluída com sucesso!' }); // Retorna um status 200 e uma mensagem de exclusão
    } catch (error) { // Trata o erro
        console.error('Erro ao excluir ocorrência:', error); // Loga o erro
        log(`Erro ao excluir ocorrência: ${error.message}`); // Grava o log
        res.status(500).json({ error: 'Erro ao excluir ocorrência no banco de dados.' }); // Retorna um status 500 e um erro genérico
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////