import React from 'react';
import PropTypes from 'prop-types';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';
import EpisodePreview from 'components/EpisodePreview';
import EpisodePropType from 'proptypes/EpisodePropType';
import Accordion from 'components/Accordion';

const ArchivePage = ({ podcasts }) => {
  const seasons = podcasts.master.episodes
    .map((episode) => episode.season)
    .reverse()
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <MainLayout>
      <h3 className="pt-3 pb-2 centered">Episode Archive</h3>
      {seasons.map((season) => (
        <Accordion key={`season-${season}`} title={`Season ${season}`}>
          {podcasts.master.episodes
            .filter((item) => item.season === season)
            .reverse()
            .map((podcast) => (
              <div key={`podcast-${podcast.guid}`} className="pb-2">
                <EpisodePreview key={podcast.guid} episode={podcast} />
              </div>
            ))}
        </Accordion>
      ))}
    </MainLayout>
  );
};

ArchivePage.propTypes = {
  podcasts: PropTypes.shape({
    master: PropTypes.shape({
      episodes: PropTypes.arrayOf(EpisodePropType),
    }),
  }).isRequired,
};

export default RenderToRoot(ArchivePage);
