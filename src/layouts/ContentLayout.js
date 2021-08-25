import React from 'react';
import PropTypes from 'prop-types';

import { Container } from 'reactstrap';

const ContentLayout = ({ children }) => (
  <div className="main-container">
    <Container fluid="xl" className="main-content">
      {children}
    </Container>
  </div>
);

ContentLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentLayout;
