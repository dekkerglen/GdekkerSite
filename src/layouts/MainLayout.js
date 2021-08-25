/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import { Container, Navbar, Col, Row } from 'reactstrap';

import ErrorBoundary from 'components/ErrorBoundary';
import Footer from 'layouts/Footer';

const NavigationLink = ({ children, label, page, setPage }) =>
  page === label ? (
    <div className="current mx-2 py-2 px-4 nav-item">
      <h6 className="m-0 centered">{children}</h6>
    </div>
  ) : (
    <div
      className="mx-2 clickable py-2 px-4 nav-item"
      onClick={
        setPage
          ? () => setPage(label)
          : () => {
              document.location.href = `/?page=${label}`;
            }
      }
    >
      {!setPage ? <h6 className="m-0 centered">{children}</h6> : <h6 className="m-0 centered">{children}</h6>}
    </div>
  );

NavigationLink.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
};

const MainLayout = ({ children, setPage, page }) => {
  return (
    <div className="flex-container flex-vertical viewport">
      <Navbar className="border-bottom" color="dark" expand="md" dark>
        <Container fluid="xl">
          <div id="container">
            <div id="left">
              {' '}
              <a href="/">
                <img className="my-2 banner-image" src="/content/logo.png" alt="Gwen Dekker" />
              </a>
            </div>
            <div className="nav-margin" id="right">
              <Row>
                <Col xs="6" sm="3">
                  <NavigationLink page={page} label="0" setPage={setPage}>
                    Home
                  </NavigationLink>
                </Col>
                <Col xs="6" sm="3">
                  <NavigationLink page={page} label="1" setPage={setPage}>
                    Projects
                  </NavigationLink>
                </Col>
                <Col xs="6" sm="3">
                  <NavigationLink page={page} label="2" setPage={setPage}>
                    Resume
                  </NavigationLink>
                </Col>
                <Col xs="6" sm="3">
                  <NavigationLink page={page} label="3" setPage={setPage}>
                    Contact
                  </NavigationLink>
                </Col>
              </Row>
            </div>
            <div id="center" />
          </div>
        </Container>
      </Navbar>
      <div className="flex-grow">
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  setPage: PropTypes.func,
  page: PropTypes.string,
};

MainLayout.defaultProps = {
  setPage: null,
  page: null,
};

export default MainLayout;
