// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// Configuração do CORS para permitir apenas o front-end
app.use(cors({
  origin: 'https://mindkidss.com', // endereço do seu front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // caso precise enviar cookies no futuro
}));

// Permite o uso de JSON no corpo das requisições
app.use(bodyParser.json());

// Rotas da API
app.use('/api', authRoutes);

// Inicializa o servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

// Adicione estas linhas no seu server.js
const paymentRoutes = require('./routes/paymentRoutes');

// Depois de criar a app do Express
app.use('/api/pagamentos', paymentRoutes);
