/* eslint-disable react/no-array-index-key */
import React from 'react';
import RenderToRoot from 'utils/RenderToRoot';
import TinyGarden from 'demos/limitedspace/TinyGarden';
import { Container, Card, CardHeader, CardBody } from 'reactstrap';

const LimitedSpace = () => {
  return (
    <Container>
      <Card className="mt-2">
        <CardHeader>
          <h4>Fruit Fitting Frenzy!</h4>
        </CardHeader>
        <CardBody>
          <TinyGarden />
        </CardBody>
      </Card>
    </Container>
  );
};

export default RenderToRoot(LimitedSpace);
