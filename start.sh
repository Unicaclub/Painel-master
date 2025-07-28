#!/bin/bash
echo "🔧 Rodando seed no banco de dados..."
docker-compose exec backend python scripts/seed.py
echo "🚀 Backend disponível em http://localhost:8000"
echo "🧠 Frontend disponível em http://localhost:3000"