#!/bin/bash
echo "🔧 Rodando migrações e seeds..."
docker-compose exec backend alembic upgrade head
docker-compose exec backend python scripts/seed.py
echo "🚀 Painel disponível em http://localhost:3000"