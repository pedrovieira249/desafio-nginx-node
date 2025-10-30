# Desafio Full Cycle - Nginx + Node.js + MySQL

Este projeto demonstra a utilização do Nginx como proxy reverso para uma aplicação Node.js com MySQL.

## 🚀 Sobre o Desafio

Quando um usuário acessa o Nginx na porta **8080**, ele faz uma chamada para a aplicação Node.js, que:
1. Adiciona um nome aleatório na tabela `people` do MySQL
2. Retorna uma página HTML com:
   - Título "Full Cycle Rocks!"
   - Lista de todos os nomes cadastrados no banco de dados

## 📋 Pré-requisitos

- Docker
- Docker Compose

## 🛠️ Como Executar

### Iniciar o projeto

```bash
docker-compose up -d
```

### Acessar a aplicação

Abra o navegador em: **http://localhost:8080**

Cada vez que você recarregar a página, um novo nome será adicionado ao banco de dados!

### Parar o projeto

```bash
docker-compose down
```

### Remover volumes (limpar banco de dados)

```bash
docker-compose down -v
rm -rf mysql
```

## 🏗️ Arquitetura

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Browser   │ ──────> │    Nginx    │ ──────> │   Node.js   │
│             │ :8080   │  (Proxy)    │ :3000   │    (App)    │
└─────────────┘         └─────────────┘         └──────┬──────┘
                                                        │
                                                        v
                                                 ┌─────────────┐
                                                 │    MySQL    │
                                                 │   (nodedb)  │
                                                 └─────────────┘
```

## 📁 Estrutura do Projeto

```
desafio-nginx-node/
├── docker-compose.yaml       # Orquestração dos containers
├── app/
│   ├── Dockerfile           # Build da aplicação Node.js
│   ├── package.json         # Dependências Node.js
│   └── index.js             # Código da aplicação
├── nginx/
│   └── nginx.conf           # Configuração do proxy reverso
└── mysql-init/
    └── init.sql             # Script de inicialização do banco
```

## 🔧 Componentes

### 1. Nginx (Proxy Reverso)
- **Porta**: 8080 (externa) → 80 (interna)
- **Função**: Recebe requisições e encaminha para o Node.js
- **Imagem**: nginx:alpine

### 2. Node.js (API)
- **Porta**: 3000
- **Função**: 
  - Recebe requisição do Nginx
  - Insere nome aleatório no MySQL
  - Retorna HTML com lista de nomes
- **Tecnologias**: Express, mysql2

### 3. MySQL (Banco de Dados)
- **Database**: nodedb
- **Tabela**: people (id, name, created_at)
- **Função**: Armazena os nomes cadastrados
- **Imagem**: mysql:5.7

## 📊 Banco de Dados

### Tabela: people

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT | Chave primária (auto increment) |
| name | VARCHAR(200) | Nome da pessoa |
| created_at | TIMESTAMP | Data de criação |

## 🎯 Funcionalidades

- ✅ Proxy reverso com Nginx
- ✅ Aplicação Node.js com Express
- ✅ Integração com MySQL
- ✅ Inserção automática de nomes aleatórios
- ✅ Listagem de todos os registros
- ✅ Healthcheck do MySQL
- ✅ Volume para desenvolvimento (hot reload)
- ✅ Inicialização automática do banco de dados
- ✅ Rede interna entre containers

## 🧪 Testando

### Teste 1: Verificar containers rodando
```bash
docker-compose ps
```

Todos devem estar com status "Up".

### Teste 2: Ver logs
```bash
# Logs de todos os serviços
docker-compose logs -f

# Logs específicos
docker-compose logs -f app
docker-compose logs -f nginx
docker-compose logs -f db
```

### Teste 3: Acessar o banco diretamente
```bash
docker exec -it db mysql -u root -proot -e "USE nodedb; SELECT * FROM people;"
```

### Teste 4: Múltiplas requisições
```bash
# Fazer 5 requisições
for i in {1..5}; do
  curl http://localhost:8080
  echo ""
done
```

## 🐛 Troubleshooting

### Erro: "Port 8080 is already allocated"
Outra aplicação está usando a porta 8080. Pare-a ou altere a porta no docker-compose.yaml.

### Erro: "MySQL Connection refused"
O MySQL ainda está inicializando. Aguarde ~30 segundos e tente novamente.

### Container app reiniciando constantemente
Verifique os logs: `docker-compose logs app`

### Limpar tudo e começar do zero
```bash
docker-compose down -v
rm -rf mysql
docker-compose up -d --build
```

## 📚 Tecnologias Utilizadas

- **Docker** & **Docker Compose**: Containerização
- **Nginx**: Proxy reverso
- **Node.js**: Runtime JavaScript
- **Express**: Framework web
- **MySQL**: Banco de dados relacional
- **mysql2**: Driver MySQL para Node.js

## 👤 Autor

Pedro Vieira - Full Cycle Student

## 📄 Licença

Este projeto é livre para uso educacional.

---

**Full Cycle Rocks!** 🚀