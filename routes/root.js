const express = require('express');
const nodemailer = require('nodemailer');
const { render } = require('../serverjs/render');

const router = express.Router();

// Home route
router.get('/', async (req, res) => {
  return render(req, res, 'LandingPage');
});

router.get('/contacted', (req, res) => {
  return render(req, res, 'ContactedPage');
});

router.get('/demos/wavefunctioncollapse', async (req, res) => {
  return render(req, res, 'WaveFunctionCollapsePage');
});

router.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  const to = 'dekker.glen@gmail.com';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `${name} - ${subject}`,
    text: `From: ${email}\n\nMessage:\n${message}`,
  };

  return transporter.sendMail(mailOptions, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } else {
      res.redirect('/contacted');
    }
  });
});

module.exports = router;
