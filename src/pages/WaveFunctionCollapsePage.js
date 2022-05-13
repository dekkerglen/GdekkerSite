import React from 'react';

import RenderToRoot from 'utils/RenderToRoot';
import { Card, Container, CardBody } from 'reactstrap';

import WaveFunctionCollapse from 'demos/wfc/WaveFunctionCollapse';

const WaveFunctionCollapsePage = () => {
  return (
    <Container>
      <Card>
        <CardBody>
          <h4>Wave Function Collapse Demo</h4>
          <WaveFunctionCollapse />
        </CardBody>
      </Card>
    </Container>
  );
};

export default RenderToRoot(WaveFunctionCollapsePage);
