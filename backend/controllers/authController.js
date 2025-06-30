// controllers/authController.js
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = bcrypt.hashSync(senha, 10);

  db.query("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", [nome, email, hash], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ msg: "Usuário cadastrado!" });
  });
};

exports.login = (req, res) => {
  const { email, senha } = req.body;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ msg: "Usuário não encontrado" });

    const user = results[0];

    if (!bcrypt.compareSync(senha, user.senha)) {
      return res.status(401).json({ msg: "Senha incorreta" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        pago: user.pago
      }
    });
  });
};

exports.confirmarPagamento = (req, res) => {
  const { email } = req.body;

  db.query("UPDATE usuarios SET pago = 1 WHERE email = ?", [email], (err) => {
    if (err) return res.status(500).json({ msg: "Erro ao confirmar pagamento" });
    res.json({ msg: "Pagamento confirmado!" });
  });
};
