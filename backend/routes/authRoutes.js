// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/criar-pagamento', paymentController.criarPagamento);
router.get('/verificar-pagamento/:paymentId', paymentController.verificarPagamento);
router.post('/webhook', paymentController.webhook);

module.exports = router;