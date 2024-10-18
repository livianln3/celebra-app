require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Seu e-mail
    pass: process.env.EMAIL_PASS  // Senha de app
  }
});

app.post('/send-code', (req, res) => {
  const { email } = req.body;
  const codigo = Math.floor(100000 + Math.random() * 900000).toString();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Código de Recuperação de Senha',
    text: `Seu código de recuperação é: ${codigo}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao enviar o e-mail.' });
    }
    console.log('E-mail enviado: ' + info.response);
    res.status(200).json({ message: 'E-mail enviado com sucesso.', codigo });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
