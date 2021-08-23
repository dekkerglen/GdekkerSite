import React from 'react';
import PropTypes from 'prop-types';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';
import EpisodePreview from 'components/EpisodePreview';
import EpisodePropType from 'proptypes/EpisodePropType';

import { Row, Col } from 'reactstrap';

const LandingPage = ({ episodes }) => {
  return (
    <MainLayout>
      <h2 className="pt-4 centered">Solely Singleton — A Magic: the Gathering Podcast</h2>
      <hr />
      <Row className="pt-4">
        <Col md={4} sm={12}>
          <img className="w-100" src="/content/thumbnail.jpg" alt="Solely Singleton Logo" />
        </Col>
        <Col md={8} sm={12}>
          <h4>About Solely Singleton</h4>
          <p>
            Solely Singleton is a Magic: the Gathering podcast predominately covering the Cube format. We strive to
            inform newer cube owners and drafters while entertaining those community members with more experience.
            During each season new episodes are released weekly on Tuesday morning (EST.) You can always check the
            latest news page for information regarding the next seasonal break. Solely Singleton releases four seasons
            each year with approximately 10 episodes per season. Episodes are planned with specific focuses such as
            drafter oriented or new cube designer episodes. Season are balanced in the types of episodes contained
            within them to supply everyone with relevant information and entertainment.
          </p>
          <p>
            The show has grown over the past year from a humble beginning. Transforming from a pair of friends
            discussing cube with a cheap microphone in a makeshift studio into a pair of friends discussing cube with
            two much more expensive microphones in a makeshift studio with thousands of weekly listeners with the help
            of dozens of supporters. Solely Singleton has become the premier cube podcast with the help of loyal
            listeners and supportive fans, for whom the hosts are eternally thankful.
          </p>
        </Col>
      </Row>
      <hr />
      <h3 className="centered">Latest Episodes</h3>
      {episodes.map((podcast) => (
        <div key={`podcast-${podcast.guid}`} className="pb-2">
          <EpisodePreview key={podcast.guid} episode={podcast} />
        </div>
      ))}
      <a href="/feed">
        <h4 className="centered">See more...</h4>
      </a>
      <br />
    </MainLayout>
  );
};

LandingPage.propTypes = {
  episodes: PropTypes.arrayOf(EpisodePropType).isRequired,
};

export default RenderToRoot(LandingPage);
