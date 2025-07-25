module.exports = (err, req, res, next) => { console.error(err.stack || err); res.status(400).json({ error: err.message || 'Erro interno', details: err.details || null }); };
