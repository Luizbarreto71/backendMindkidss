// controllers/paymentController.js
const db = require('../db');
const mercadopago = require('mercadopago');

// Configura o Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

exports.criarPagamento = async (req, res) => {
  const { userId, email } = req.body;

  try {
    // Cria a preferência de pagamento
    const preference = {
      items: [
        {
          title: 'Acesso Premium MindKids',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 19.90
        }
      ],
      payer: {
        email: email
      },
      external_reference: userId.toString(),
      back_urls: {
        success: `${process.env.FRONTEND_URL}/pagamento/sucesso`,
        failure: `${process.env.FRONTEND_URL}/pagamento/erro`,
        pending: `${process.env.FRONTEND_URL}/pagamento/pendente`
      },
      auto_return: 'approved',
      notification_url: `${process.env.BACKEND_URL}/api/pagamentos/webhook`
    };

    const response = await mercadopago.preferences.create(preference);
    
    res.json({
      url: response.body.init_point,
      paymentId: response.body.id
    });

  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    res.status(500).json({ error: 'Erro ao processar pagamento' });
  }
};

exports.verificarPagamento = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const response = await mercadopago.payment.findById(paymentId);
    const payment = response.body;

    if (payment.status === 'approved') {
      await db.query(
        "UPDATE usuarios SET pago = 1 WHERE id = ?", 
        [payment.external_reference]
      );
    }

    res.json({
      status: payment.status,
      paid: payment.status === 'approved'
    });

  } catch (error) {
    console.error('Erro ao verificar pagamento:', error);
    res.status(500).json({ error: 'Erro ao verificar pagamento' });
  }
};

exports.webhook = async (req, res) => {
  try {
    const { data } = req.body;
    
    if (data?.id) {
      const response = await mercadopago.payment.findById(data.id);
      const payment = response.body;

      if (payment.status === 'approved') {
        await db.query(
          "UPDATE usuarios SET pago = 1 WHERE id = ?", 
          [payment.external_reference]
        );
      }
    }

    res.status(200).end();
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).end();
  }
};