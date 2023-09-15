// Load Environment Variables
require('dotenv').config();

const serialize = require('serialize-javascript');

const render = (req, res, page, reactProps = {}, options = {}) => {
  reactProps.loginCallback = req.baseUrl + req.path;
  reactProps.nitroPayEnabled = process.env.NITROPAY_ENABLED === 'true';

  if (!options.metadata) {
    options.metadata = [];
  }
  if (!options.metadata.some((data) => data.property === 'og:image')) {
    options.metadata.push({
      property: 'og:image',
      content: '/content/sticker.png',
    });
  }

  res.render('main', {
    reactProps: serialize(reactProps),
    node_env: process.env.NODE_ENV,
    page,
    metadata: options.metadata,
    title: options.title ? `${options.title}` : 'Gwen Dekker',
    metaDescription: options.description || 'Gwen Dekker is a software developer passionate about building new things.',
  });
};

module.exports = {
  render,
};
