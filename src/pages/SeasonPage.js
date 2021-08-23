import React from 'react';
import PropTypes from 'prop-types';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';
import EpisodePreview from 'components/EpisodePreview';
import EpisodePropType from 'proptypes/EpisodePropType';
import PagedList from 'components/PagedList';

import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const SeasonPage = ({ episodes, season }) => {
  return (
    <MainLayout>
      <h5 className="pt-2">
        <Breadcrumb>
          <BreadcrumbItem active>{`Season ${season}`}</BreadcrumbItem>
        </Breadcrumb>
      </h5>
      <PagedList
        pageSize={20}
        showBottom
        rows={episodes.map((podcast) => (
          <div key={`podcast-${podcast.guid}`} className="pb-2">
            <EpisodePreview key={podcast.guid} episode={podcast} />
          </div>
        ))}
      />
    </MainLayout>
  );
};

SeasonPage.propTypes = {
  episodes: PropTypes.arrayOf(EpisodePropType).isRequired,
  season: PropTypes.number.isRequired,
};

export default RenderToRoot(SeasonPage);
