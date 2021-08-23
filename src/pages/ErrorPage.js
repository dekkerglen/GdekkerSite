import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardHeader, CardBody } from 'reactstrap';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';

const ErrorPage = ({ title, error, requestId, details }) => {
  console.log(details);
  return (
    <MainLayout>
      <h3 className="pt-4 centered">{title}</h3>
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
