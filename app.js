// Load Environment Variables
require('dotenv').config();

const express = require('express');
const path = require('path');
const http = require('http');
const compression = require('compression');
const schedule = require('node-schedule');
const bodyParser = require('body-parser');
const { render } = require('./serverjs/render');
const { fetchPodcasts } = require('./serverjs/podcasts');

// Init app
const app = express();

// gzip middleware
app.use(compression());

// request timeout middleware
app.use((req, res, next) => {
  req.setTimeout(60 * 1000, () => {
    const err = new Error('Request Timeout');
    err.status = 408;
    next(err);
  });
  res.setTimeout(60 * 1000, () => {
    const err = new Error('Service Unavailable');
    err.status = 503;
    next(err);
  });
  next();
});

// Body parser middleware
app.use(
  bodyParser.urlencoded({
    limit: '200mb',
    extended: true,
  }),
);
app.use(
  bodyParser.json({
    limit: '200mb',
    extended: true,
  }),
);

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'dist')));

app.use('', require('./routes/root'));

app.use((req, res) => {
  return render(req, res, 'ErrorPage', {
    requestId: req.uuid,
    title: '404: Page not found',
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  if (!res.statusCode) {
    res.status(500);
  }
  return render(req, res, 'ErrorPage', {
    error: err.message,
    requestId: req.uuid,
    title: 'Oops! Something went wrong.',
  });
});

schedule.scheduleJob('*/10 * * * *', async () => {
  console.log('Updating podcast data from RSS feed...');
  await fetchPodcasts();
});

fetchPodcasts();

// Start server after carddb is initialized.
http.createServer(app).listen(process.env.PORT || 5000, '127.0.0.1');
console.log(`Server started on port ${process.env.PORT || 5000}...`);
