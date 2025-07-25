const { sendMessage } = require('./whatsappService');

async function enviarMensagem(req, res) {
    const { phone, message } = req.body;
    if (!phone || !message) return res.status(400).json({ error: 'phone/message required' });
    const result = await sendMessage(phone, message);
    res.json(result);
}

module.exports = { enviarMensagem };
