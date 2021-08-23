/* eslint-disable react/no-danger */
import React from 'react';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';
import EpisodePropType from 'proptypes/EpisodePropType';
import ReactAudioPlayer from 'react-audio-player';

import { Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';

const EpisodePage = ({ episode }) => {
  return (
    <MainLayout>
      <h5 className="pt-2">
        <Breadcrumb>
          <BreadcrumbItem>
            <a href={`/season/${episode.season}`}>{`Season ${episode.season}`}</a>
          </BreadcrumbItem>
          <BreadcrumbItem active>{episode.title}</BreadcrumbItem>
        </Breadcrumb>
      </h5>
      <Row>
        <Col md="2" xs="6">
          <img className="w-100" src={episode.image} alt="Solely Singleton Logo" />
        </Col>
        <Col md="10" xs="6">
          <h6>{episode.date.toDateString()}</h6>
          <ReactAudioPlayer src={episode.source} controls />
        </Col>
      </Row>
      <br />
      <div dangerouslySetInnerHTML={{ __html: episode.description }} />
    </MainLayout>
  );
};

EpisodePage.propTypes = {
  episode: EpisodePropType.isRequired,
};

export default RenderToRoot(EpisodePage);
