import React from 'react';
import PropTypes from 'prop-types';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';
import EpisodePreview from 'components/EpisodePreview';
import EpisodePropType from 'proptypes/EpisodePropType';
import PagedList from 'components/PagedList';

const FeedPage = ({ podcasts }) => {
  return (
    <MainLayout>
      <h3 className="pt-3 centered">Podcast Feed</h3>
      <PagedList
        pageSize={20}
        showBottom
        rows={podcasts.master.episodes.map((podcast) => (
          <div key={`podcast-${podcast.guid}`} className="pb-2">
            <EpisodePreview key={podcast.guid} episode={podcast} />
          </div>
        ))}
      />
    </MainLayout>
  );
};

FeedPage.propTypes = {
  podcasts: PropTypes.shape({
    master: PropTypes.shape({
      episodes: PropTypes.arrayOf(EpisodePropType),
    }),
  }).isRequired,
};

export default RenderToRoot(FeedPage);
