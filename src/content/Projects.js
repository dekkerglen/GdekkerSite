import React from 'react';

import { Row, Col, Card, CardBody } from 'reactstrap';

const ProjectsPage = () => {
  return (
    <>
      <Card className="mt-4">
        <CardBody>
          <Row className="pt-4">
            <Col md={4} sm={12}>
              <a href="https://cubecobra.com" target="_blank" rel="noreferrer">
                <img className="w-100" src="/content/cc.png" alt="Cube Cobra Logo" />
              </a>
            </Col>
            <Col md={8} sm={12}>
              <h4>
                <a href="https://cubecobra.com" target="_blank" rel="noreferrer">
                  Cube Cobra
                </a>
              </h4>
              <p>
                Cube Cobra is user content driven open source web tool used for managing Magic: the Gathering cubes. It
                offers the best tools on the market for managing Magic: the Gathering cubes, and also has powerful
                analytic tools to make conclusions on not just specific cube objects, but also aggregations across all
                cubes on the site.
              </p>
              <p>
                The website backend is written in Node.js. The frontend is a React application built using the Bootstrap
                framework.
              </p>
              <p>
                Cube Cobra uses a grab-bag of various technologies to accomplish its goals. While Cube Cobra is mostly
                JS everwhere, we also use tensorflow for our machine learning module, running a model in a distinct
                flask server.
              </p>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="mt-4">
        <CardBody>
          <Row className="pt-4">
            <Col md={8} sm={12}>
              <h4>
                <a href="https://solelysingleton.com" target="_blank" rel="noreferrer">
                  Solely Singleton (website)
                </a>
              </h4>
              <p>
                Solely Singleton is a Magic: the Gathering podcast predominately covering the Cube format. It is the
                most popular podcast covering this topic, and the hosts also dip their toes into other topic such as
                Warhammer 40K and Path of Exile.
              </p>
              <p>
                The website backend is written in Node.js. The frontend is a React application built using the Bootstrap
                framework. The website serves as a portal for fans of the podcast to listen to old episodes, and to stay
                up to date with the latest episodes.
              </p>
            </Col>
            <Col md={4} sm={12}>
              <a href="https://solelysingleton.com" target="_blank" rel="noreferrer">
                <img className="w-100" src="/content/ss.jpg" alt="Solely Singleton Logo" />
              </a>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="my-4">
        <CardBody>
          <Row className="pt-4">
            <Col md={4} sm={12}>
              <a href="https://mtgcubecon.com" target="_blank" rel="noreferrer">
                <img className="w-100" src="/content/cubecon.png" alt="Cube Cobra Logo" />
              </a>
            </Col>
            <Col md={8} sm={12}>
              <h4>
                <a href="https://mtgcubecon.com" target="_blank" rel="noreferrer">
                  MTG Cube Con (website)
                </a>
              </h4>
              <p>
                Cube Con is a three day event where fans of Magic: the Gathering cube can come together and share their
                passion for the game. Initially scheduled for memorial day weekend in 2020, we had to postpone due to
                the Covid outbreak. We are still working on the event, and looking for a time when it is safe to gather
                again.
              </p>
              <p>
                The website backend is written in Node.js. The frontend is a simple website rendered with Pug/Jade and
                uses Bootstrap for styling. The website is built for participants to purchase entries for the event, and
                also to handle event scheduling and organization.
              </p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default ProjectsPage;
