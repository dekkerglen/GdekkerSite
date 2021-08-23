import React from 'react';

import htmlToText from 'html-to-text';
import { Card, CardBody, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import EpisodePropType from 'proptypes/EpisodePropType';

const EpisodePreview = ({ episode }) => {
  const short = htmlToText
    .fromString(episode.description, {
      wordwrap: 130,
    })
    .substring(0, 300);

  return (
    <Card>
      <CardBody>
        <Row>
          <Col md="2" xs="6">
            <img className="w-100" src={episode.image} alt="Solely Singleton Logo" />
          </Col>
          <Col md="10" xs="6">
            <Breadcrumb>
              <BreadcrumbItem>
                <a href={`/season/${episode.season}`}>{`Season ${episode.season}`}</a>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <a href={`/episode/${episode.guid}`}>{episode.title}</a>
              </BreadcrumbItem>
            </Breadcrumb>
            <h6>{episode.date.toDateString()}</h6>
            <p>{`${short}...`}</p>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

EpisodePreview.propTypes = {
  episode: EpisodePropType.isRequired,
};

export default EpisodePreview;
