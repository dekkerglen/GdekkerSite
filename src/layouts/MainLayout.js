import React from 'react';
import PropTypes from 'prop-types';

import { Container, Collapse, Nav, Navbar, NavItem, NavLink } from 'reactstrap';

import ErrorBoundary from 'components/ErrorBoundary';
import Footer from 'layouts/Footer';
import useToggle from 'hooks/UseToggle';

const MainLayout = ({ children }) => {
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
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/resume">Resume</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/projects">Projects</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contact">Contact</NavLink>
              </NavItem>
            </Nav>
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
};

export default MainLayout;
