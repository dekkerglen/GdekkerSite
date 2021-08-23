import React from 'react';

import { Container } from 'reactstrap';

import Copyright from 'components/Copyright';
import { RssIcon, MailIcon } from '@primer/octicons-react';

const Footer = () => (
  <footer>
    <Container className="pt-3">
      <p className="center footer-text">
        <a href="https://solelysingleton.libsyn.com/rss" target="_blank" rel="noopener noreferrer">
          <RssIcon size={24} />
        </a>
        <a className="pl-4" href="mailto:solelysingleton@gmail.com">
          <MailIcon size={24} />
        </a>
        <a
          className="pl-4"
          href="https://open.spotify.com/show/0CfNw1XlffLXeYVsYq26xW"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="icon mt-0" height="24" src="/content/spotify.svg" alt="spotify" />
        </a>
        <a
          className="pl-4"
          href="https://podcasts.apple.com/us/podcast/solely-singleton/id1383100225?ls=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="icon mt-0" height="24" src="/content/itunes.png" alt="itunes" />
        </a>
        <a className="pl-4" href="https://www.patreon.com/SolelySingleton" target="_blank" rel="noopener noreferrer">
          <img className="icon mt-0" height="24" src="/content/patreon.png" alt="itunes" />
        </a>
      </p>

      <p className="center footer-text">
        <a className="footer-link" href="/privacy">
          Privacy Policy
        </a>
        {' | '}
        <a className="footer-link" href="/tos">
          Terms & Conditions
        </a>
        {' | '}
        <a className="footer-link" href="/cookies">
          Cookies
        </a>
        <br />
        Magic: The Gathering is ©{' '}
        <a className="footer-link" href="https://company.wizards.com/">
          Wizards of the Coast
        </a>
        . Solely Singleton is not affiliated nor produced nor endorsed by Wizards of the Coast.
        <br />
        All card images, mana symbols, expansions and art related to Magic the Gathering is a property of Wizards of the
        Coast/Hasbro.
        <br />
        <Copyright />
      </p>
    </Container>
  </footer>
);

export default Footer;
