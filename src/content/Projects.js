import React from 'react';

import ContentLayout from 'layouts/ContentLayout';

import { Row, Col, Card, CardBody } from 'reactstrap';

const ProjectsPage = () => {
  return (
    <ContentLayout>
      <Card className="mt-4">
        <CardBody>
          <Row className="pt-4">
            <Col md={6} sm={12}>
              <h4>
                <a href="/demos/limitedspace" target="_blank" rel="noreferrer">
                  Fruit Fitting Frenzy!
                </a>
              </h4>
              <p>
                Fruit Fitting Frenzy is a small puzzle game where players are presented with a grid, and restrictions on
                how to fit fruit into the grid. The goal is to fit all the fruit into the grid while following all the
                restrictions.
              </p>
              <p>
                This game was made for <a href="https://ldjam.com/events/ludum-dare/54">Ludum Dare 54</a>, a game jam
                where participants are given 48 hours to make a game from scratch. The theme for this jam was 'Limited
                Space'. I built this game under the compo rules, meaning I had to do all the work myself and I had to
                make the game from scratch (no pre-existing code).
              </p>
              <p>
                This is my first time participating in Ludum Dare, and I scoped for a very small game. The game isn't
                incredibly deep, but I think it is a fun little puzzle game that can be played in a few minutes.
              </p>
            </Col>
            <Col md={6} sm={12}>
              <a href="/demos/limitedspace">
                <img className="w-100" src="/content/tinygarden.png" alt="Fruit Fitting Frenzy!" />
              </a>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="mt-4">
        <CardBody>
          <Row className="pt-4">
            <Col md={3} sm={12}>
              <a href="/manamatrix" target="_blank" rel="noreferrer">
                <img className="w-100" src="/content/manamatrix.png" alt="Mana Matrix" />
              </a>
            </Col>
            <Col md={9} sm={12}>
              <h4>
                <a href="/manamatrix" target="_blank" rel="noreferrer">
                  Mana Matrix
                </a>
              </h4>
              <p>
                Mana Matrix is a small wordle-like game where players are presented with a 3x3 grid. Each row and each
                column has a specific{' '}
                <a href="https://scryfall.com/docs/syntax" target="_blank" rel="noreferrer">
                  scryfall search synytax
                </a>
                , and the goal is to find a card that matches each cell.
              </p>
              <p>
                A new puzzle is generated every day, and players are encouraged to share their results on social media.
              </p>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="mt-4">
        <CardBody>
          <Row className="pt-4">
            <Col md={9} sm={12}>
              <h4>
                <a href="/demos/wavefunctioncollapse" target="_blank" rel="noreferrer">
                  Wave Function Collapse for Terrain Generation (demo)
                </a>
              </h4>
              <p>
                Wave Function Collapse, in addition to the quantum mechanics definition, is also the name of an
                algorithm for procedural generation. This is a small demo of the algorithm, which is being used to
                generate some simple terrain using a tilemap from Pokemon Emerald.
              </p>
              <p>
                The algorithm works by ingesting a tilemap and a set of adjacency rules for each tile. The initial state
                of the output is a superposition of all possible states. The algorithm then randomly collapses a single
                tile, and locks in the state of that tile. The neighboring tiles possible values are then constrained to
                all possible values given the adjacency rules. Then the algorithm repeats until all tiles are collapsed,
                prioritizing the lowest entropy tiles.
              </p>
            </Col>
            <Col md={3} sm={12}>
              <a href="/demos/wavefunctioncollapse">
                <img className="w-100" src="/content/waveformcollapse.png" alt="Wave Function Collapse" />
              </a>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="mt-4">
        <CardBody>
          <Row className="pt-4">
            <Col md={3} sm={12}>
              <a href="https://cubecobra.com" target="_blank" rel="noreferrer">
                <img className="w-100" src="/content/cc.png" alt="Cube Cobra Logo" />
              </a>
            </Col>
            <Col md={9} sm={12}>
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
            <Col md={9} sm={12}>
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
            <Col md={3} sm={12}>
              <a href="https://solelysingleton.com" target="_blank" rel="noreferrer">
                <Card>
                  <img className="w-100 img-corners" src="/content/ss.jpg" alt="Solely Singleton Logo" />
                </Card>
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
    </ContentLayout>
  );
};

export default ProjectsPage;
