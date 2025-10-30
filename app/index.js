const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

// Array de nomes para inserção aleatória
const names = [
    'João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa',
    'Carlos Souza', 'Julia Ferreira', 'Lucas Almeida', 'Beatriz Lima',
    'Rafael Rocha', 'Fernanda Martins', 'Gabriel Pereira', 'Larissa Dias',
    'Bruno Cardoso', 'Camila Ribeiro', 'Thiago Barbosa', 'Patricia Gomes',
    'Rodrigo Santos', 'Amanda Silva', 'Felipe Costa', 'Juliana Oliveira'
];

// Função para obter um nome aleatório
function getRandomName() {
    return names[Math.floor(Math.random() * names.length)];
}

// Função para aguardar o MySQL estar pronto
async function waitForMySQL() {
    let attempts = 0;
    const maxAttempts = 20;
    
    while (attempts < maxAttempts) {
        try {
            const connection = await mysql.createConnection(dbConfig);
            console.log('✓ Conectado ao MySQL com sucesso!');
            await connection.end();
            return true;
        } catch (err) {
            attempts++;
            console.log(`Tentando conectar ao MySQL... (${attempts}/${maxAttempts})`);
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
    
    throw new Error('Não foi possível conectar ao MySQL');
}

// Rota principal
app.get('/', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        
        // Insere um nome aleatório
        const randomName = getRandomName();
        await connection.execute(
            'INSERT INTO people (name) VALUES (?)',
            [randomName]
        );
        
        // Busca todos os nomes cadastrados
        const [rows] = await connection.execute(
            'SELECT id, name, created_at FROM people ORDER BY created_at DESC'
        );
        
        await connection.end();
        
        // Monta o HTML
        let html = '<h1>Full Cycle Rocks!</h1>';
        html += '<h2>Lista de Pessoas Cadastradas:</h2>';
        html += '<ul>';
        
        if (rows.length > 0) {
            rows.forEach(row => {
                html += `<li>${row.name} (ID: ${row.id})</li>`;
            });
        } else {
            html += '<li>Nenhuma pessoa cadastrada ainda.</li>';
        }
        
        html += '</ul>';
        html += `<p style="color: #666; font-size: 12px;">Total de registros: ${rows.length}</p>`;
        html += `<p style="color: #28a745; font-weight: bold;">✓ Novo nome adicionado: ${randomName}</p>`;
        
        res.send(html);
        
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send(`
            <h1>Erro ao processar requisição</h1>
            <p>${error.message}</p>
        `);
    }
});

// Rota de saúde
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Aplicação rodando!' });
});

// Inicia o servidor
async function startServer() {
    try {
        await waitForMySQL();
        
        app.listen(port, '0.0.0.0', () => {
            console.log(`Servidor rodando na porta ${port}`);
            console.log('Acesse através do Nginx em: http://localhost:8080');
        });
    } catch (error) {
        console.error('Erro ao iniciar servidor:', error);
        process.exit(1);
    }
}

startServer();