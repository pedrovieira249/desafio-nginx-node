# 🚀 Quick Start Guide

## Comandos Essenciais

### Iniciar o projeto
```bash
docker-compose up -d
```

### Ver status dos containers
```bash
docker-compose ps
```

### Ver logs em tempo real
```bash
docker-compose logs -f
```

### Parar o projeto
```bash
docker-compose down
```

### Reconstruir e reiniciar
```bash
docker-compose up -d --build
```

### Limpar tudo (incluindo dados do banco)
```bash
docker-compose down -v
rm -rf mysql
```

## Acessos

- **Aplicação**: http://localhost:8080
- **MySQL**: localhost:3306 (dentro dos containers)

## Testar

### Navegador
Abra: http://localhost:8080

### cURL
```bash
curl http://localhost:8080
```

### Ver dados no MySQL
```bash
docker exec -it db mysql -u root -proot -e "SELECT * FROM nodedb.people;"
```

## Verificação Rápida

```bash
# 1. Subir containers
docker-compose up -d

# 2. Aguardar ~30 segundos (MySQL inicializar)
sleep 30

# 3. Testar
curl http://localhost:8080

# 4. Ver logs
docker-compose logs app
```

## One-Liner: Setup completo

```bash
docker-compose up -d && sleep 30 && curl http://localhost:8080
```

---

**Full Cycle Rocks!** 🎉