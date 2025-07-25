const express = require('express');
const router = express.Router();
const { enviarMensagem } = require('./whatsappController');

router.post('/send', enviarMensagem);

module.exports = router;
