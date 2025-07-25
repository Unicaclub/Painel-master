const axios = require('axios');

const ZAPI_URL = process.env.ZAPI_URL || 'http://localhost:8000'; // Substitua pelo endpoint real da sua Z-API
const ZAPI_TOKEN = process.env.ZAPI_TOKEN || 'SEU_TOKEN_AQUI';    // Token de autenticação

async function sendMessage(phone, message) {
    try {
        const res = await axios.post(
            \\${ZAPI_URL}/message/send\,
            {
                phone,
                message
            },
            {
                headers: { Authorization: \Bearer \${ZAPI_TOKEN}\ }
            }
        );
        return res.data;
    } catch (err) {
        console.error('Erro ao enviar WhatsApp:', err.message);
        return { error: err.message };
    }
}

module.exports = { sendMessage };
