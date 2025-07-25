// Integração zapi - Conecte via REST/API/Webhook
require('dotenv').config();
const axios = require('axios');
// Exemplo de função:
async function ping() {
    // Implemente o ping/teste da API real aqui
    return { status: 'ok', svc: 'zapi' };
}
module.exports = { ping };
