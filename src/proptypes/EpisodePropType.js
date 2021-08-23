import PropTypes from 'prop-types';

const EpisodePropType = PropTypes.shape({
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  guid: PropTypes.string,
  season: PropTypes.string,
  date: PropTypes.shape({
    toDateString: PropTypes.func,
  }),
});

export default EpisodePropType;
