import React from 'react';

import { Container } from 'reactstrap';

import Copyright from 'components/Copyright';
import { MailIcon } from '@primer/octicons-react';

const Footer = () => (
  <footer className="border-top">
    <Container className="pt-3">
      <p className="center footer-text">
        <a className="pl-4" href="/contact">
          <MailIcon size={24} />
        </a>
        <a className="pl-4" href="https://github.com/dekkerglen" target="_blank" rel="noreferrer">
          <img className="octicon icon" src="/content/github.png" alt="github" />
        </a>
        <a className="pl-4" href="https://twitter.com/GwenDekker" target="_blank" rel="noreferrer">
          <img className="octicon icon" src="/content/twitter.svg" alt="twitter" />
        </a>
        <a className="pl-4" href="https://www.linkedin.com/in/dekkerglen" target="_blank" rel="noreferrer">
          <img className="octicon icon" src="/content/linkedin.png" alt="linkedin" />
        </a>
      </p>

      <p className="center footer-text">
        <Copyright />
      </p>
    </Container>
  </footer>
);

export default Footer;
