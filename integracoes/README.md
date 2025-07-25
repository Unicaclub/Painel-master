# MCP GODSOURCE INTEGRAÇÕES

- Webhook universal rodando em http://localhost:5050
- Plug and play para: ZAPI, Zapier, MetaAds, Google, WhatsApp, Facebook, Evolution, N8N, etc.
- Adicione as chaves em .env e rode: node integracoes/webhookListener.js
- Teste local: curl -X POST http://localhost:5050/webhook/zapi -d '{"msg":"Testando"}' -H "Content-Type: application/json"
