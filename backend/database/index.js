const mongoose = require('mongoose');
const { dbUri } = require('../config/config');

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('🟢 MongoDB conectado');
  } catch (err) {
    console.error('🔴 Erro ao conectar no MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
