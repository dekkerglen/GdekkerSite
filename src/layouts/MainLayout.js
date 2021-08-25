import React from 'react';
import PropTypes from 'prop-types';

import { Container, Collapse, Nav, Navbar, NavItem } from 'reactstrap';

import ErrorBoundary from 'components/ErrorBoundary';
import Footer from 'layouts/Footer';
import useToggle from 'hooks/UseToggle';

const NavigationLink = ({ children, label, page, setPage }) =>
  page === label ? (
    <NavItem className="current mx-2 py-2 px-4">
      <h6 className="m-0">{children}</h6>
    </NavItem>
  ) : (
    <NavItem
      className="mx-2 clickable py-2 px-4"
      onClick={
        setPage
          ? () => setPage(label)
          : () => {
              document.location.href = `/?page=${label}`;
            }
      }
    >
      {!setPage ? <h6 className="m-0">{children}</h6> : <h6 className="m-0">{children}</h6>}
    </NavItem>
  );

NavigationLink.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
};

const MainLayout = ({ children, setPage, page }) => {
  const [expanded, toggle] = useToggle(false);

  return (
    <div className="flex-container flex-vertical viewport">
      <Navbar className="border-bottom" color="dark" expand="md" dark>
        <Container fluid="xl">
          <div className="d-flex flex-nowrap header-banner">
            <div className="overflow-hidden mr-auto">
              <a href="/">
                <img className="my-2 banner-image" src="/content/logo.png" alt="Gwen Dekker" />
              </a>
            </div>
            <button className="navbar-toggler" type="button" onClick={toggle}>
              <span className="navbar-toggler-icon" />
            </button>
          </div>
          <Collapse className="banner-collapse" isOpen={expanded} navbar>
            <Nav className="mr-auto" navbar>
              <NavigationLink page={page} label="0" setPage={setPage}>
                Home
              </NavigationLink>
              <NavigationLink page={page} label="1" setPage={setPage}>
                Projects
              </NavigationLink>
              <NavigationLink page={page} label="2" setPage={setPage}>
                Resume
              </NavigationLink>
              <NavigationLink page={page} label="3" setPage={setPage}>
                Contact
              </NavigationLink>
            </Nav>
          </Collapse>
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
