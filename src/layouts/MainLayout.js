import React from 'react';
import PropTypes from 'prop-types';

import { Container, Collapse, Nav, Navbar, NavItem, NavLink } from 'reactstrap';

import ErrorBoundary from 'components/ErrorBoundary';
import Footer from 'layouts/Footer';
import useToggle from 'hooks/UseToggle';

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
            {setPage ? (
              <Nav className="mr-auto" navbar>
                <NavItem>
                  {page === 'home' ? (
                    <NavLink className="disabled" onClick={() => setPage('home')}>
                      Home
                    </NavLink>
                  ) : (
                    <NavLink className="clickable" onClick={() => setPage('home')}>
                      Home
                    </NavLink>
                  )}
                </NavItem>
                <NavItem>
                  {page === 'resume' ? (
                    <NavLink className="disabled" onClick={() => setPage('resume')}>
                      Resume
                    </NavLink>
                  ) : (
                    <NavLink className="clickable" onClick={() => setPage('resume')}>
                      Resume
                    </NavLink>
                  )}
                </NavItem>
                <NavItem>
                  {page === 'projects' ? (
                    <NavLink className="disabled" onClick={() => setPage('projects')}>
                      Projects
                    </NavLink>
                  ) : (
                    <NavLink className="clickable" onClick={() => setPage('projects')}>
                      Projects
                    </NavLink>
                  )}
                </NavItem>
                <NavItem>
                  {page === 'contact' ? (
                    <NavLink className="disabled" onClick={() => setPage('contact')}>
                      Contact
                    </NavLink>
                  ) : (
                    <NavLink className="clickable" onClick={() => setPage('contact')}>
                      Contact
                    </NavLink>
                  )}
                </NavItem>
              </Nav>
            ) : (
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/?page=home">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/?page=resume">Resume</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/?page=projects">Projects</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/?page=contact">Contact</NavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
      <Container fluid="xl" className="flex-grow main-content">
        <ErrorBoundary>{children}</ErrorBoundary>
      </Container>
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
