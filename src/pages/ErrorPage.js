import React from 'react';
import PropTypes from 'prop-types';

import { Card, Container, CardBody } from 'reactstrap';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';

const ErrorPage = ({ title, error, requestId, details }) => {
  console.log(details);
  return (
    <MainLayout>
      <div className="main-container">
        <Container fluid="xl" className="main-content">
          <Card className="mt-4">
            <CardBody>
              <h3 className="centered">{title}</h3>
              {details && <p className="centered pt-3">{details}</p>}
              {(error || requestId) && (
                <Card>
                  {error && (
                    <p>
                      {' '}
                      <code>{error}</code>
                    </p>
                  )}
                  {requestId && (
                    <p>
                      Request ID: <code>{requestId}</code>
                    </p>
                  )}
                </Card>
              )}
            </CardBody>
          </Card>
        </Container>
      </div>
    </MainLayout>
  );
};

ErrorPage.propTypes = {
  title: PropTypes.string.isRequired,
  requestId: PropTypes.string,
  error: PropTypes.string,
  details: PropTypes.string,
};

ErrorPage.defaultProps = {
  requestId: null,
  error: null,
  details: null,
};

export default RenderToRoot(ErrorPage);
