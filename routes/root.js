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

router.get('/questingbeast', async (req, res) => {
  // redirect to a random seed
  const seed = Math.floor(Math.random() * 1000000000);
  return res.redirect(`/questingbeast/${seed}`);
});

router.get('/questingbeast/:seed', async (req, res) => {
  return render(req, res, 'QuestingBeastPage', { seed: req.params.seed });
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
