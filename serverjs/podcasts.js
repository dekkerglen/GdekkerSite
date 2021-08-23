/* eslint-disable no-await-in-loop */
const { getFeedEpisodes, getFeedData } = require('./rss');

const feeds = [
  {
    name: 'master',
    url: 'https://solelysingleton.libsyn.com/rss',
  },
];

const podcasts = {};

const fetchPodcasts = async () => {
  for (const feed of feeds) {
    if (!podcasts[feed.name]) {
      podcasts[feed.name] = {};
      podcasts[feed.name].data = await getFeedData(feed.url);
      podcasts[feed.name].episodes = [];
    }
    podcasts[feed.name].episodes = (await getFeedEpisodes(feed.url)).map((episode) => {
      const podcastEpisode = {};

      podcastEpisode.title = episode.title;
      podcastEpisode.description = episode.description;
      podcastEpisode.guid = episode.guid;
      podcastEpisode.link = episode.link;
      podcastEpisode.source = episode.source;
      podcastEpisode.season = episode.season || '1';
      podcastEpisode.date = new Date(episode.date);

      podcastEpisode.image = podcasts[feed.name].data.image;
      podcastEpisode.podcastname = podcasts[feed.name].data.title;

      return podcastEpisode;
    });
  }
};

module.exports = {
  fetchPodcasts,
  getPodcasts: () => podcasts,
};
