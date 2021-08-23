import React from 'react';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';

import { Row, Col } from 'reactstrap';

const AboutPage = () => {
  return (
    <MainLayout>
      <Row className="pt-4">
        <Col md={4} sm={12}>
          <img className="w-100" src="/content/thumbnail.jpg" alt="Solely Singleton Logo" />
        </Col>
        <Col md={8} sm={12}>
          <h4>Solely Singleton</h4>
          <p>
            Solely Singleton is a Magic: the Gathering podcast predominately covering the Cube format. We strive to
            inform newer cube owners and drafters while entertaining those community members with more experience.
            During each season new episodes are released weekly on Tuesday morning (EST.) You can always check the
            latest news page for information regarding the next seasonal break. Solely Singleton releases four seasons
            each year with approximately 10 episodes per season. Episodes are planned with specific focuses such as
            drafter oriented or new cube designer episodes. Season are balanced in the types of episodes contained
            within them to supply everyone with relevant information and entertainment.
          </p>
          <p>
            The show has grown over the past year from a humble beginning. Transforming from a pair of friends
            discussing cube with a cheap microphone in a makeshift studio into a pair of friends discussing cube with
            two much more expensive microphones in a makeshift studio with thousands of weekly listeners with the help
            of dozens of supporters. Solely Singleton has become the premier cube podcast with the help of loyal
            listeners and supportive fans, for whom the hosts are eternally thankful.
          </p>
        </Col>
      </Row>
      <hr />
      <Row className="pt-4">
        <Col md={8} sm={12}>
          <h4>Poorhammer</h4>
          <p>
            The Poorhammer Podcast covers a variety of content for Warhammer games and the surrounding hobbies, covering
            a variety of content from in-game strategy to army building to collecting and painting new armies. Our goal
            is to help Warhammer be approachable and welcoming to all players and hobbyists.
          </p>
        </Col>
        <Col md={4} sm={12}>
          <img className="w-100" src="/content/poorhammer-thumbnail.png" alt="PoorHammer Logo" />
        </Col>
      </Row>
      <hr />
      <Row className="pt-4">
        <Col md={4} sm={12}>
          <img className="w-100" src="/content/bradhand.jpg" alt="Brad AKA DrRuler" />
        </Col>
        <Col md={8} sm={12}>
          <h4>
            Brad AKA DrRuler{'  '}
            <a href="https://twitter.com/DrRuler" target="_blank" rel="noreferrer">
              <img src="content/twitter.svg" alt="Twitter" width="25" height="25" />
            </a>
          </h4>
          <p>
            Brad has been playing nerdy games his entire life along with his friend Eric. While at university in 2009 he
            saw some other students playing a card game he remembered playing as a kid and decided to learn how to play
            again. By the end of the week he had convinced his friend to buy a set of Zendikar Intro decks at the local
            store and learn to play this “Magic” game with him. Within 12 months he was playing in loca FNMs and PTQs
            while building piles of cheap EDH decks. At this point he made the grave mistake of looking into a format
            called Cube. Over the next few months Brad bought and traded for every remotely playable card he could find
            and consumed every second of Cube content he could get his hands on. The terrible first iteration of his
            cube was soon born, and his wallet would never truly recover. Many discoveries of personal taste and changes
            in design philosophy later he thought he might finally have some intelligent thoughts cube.
          </p>
          <p>
            Eight years later, he lamented the lack of quality cube content and decided to try his own hand at it. With
            the amazingly persuasive sentence, “We should make a podcast.” he managed to convince Eric to humor him once
            again. Thus began their next adventure into the world of podcasting.
          </p>
        </Col>
      </Row>
      <hr />
      <Row className="pt-4">
        <Col md={8} sm={12}>
          <h4>
            Eric AKA OnekuoSora{'  '}
            <a href="https://twitter.com/OnekuoSora" target="_blank" rel="noreferrer">
              <img src="content/twitter.svg" alt="Twitter" width="25" height="25" />
            </a>
          </h4>
          <p>
            Eric started playing StarCraft about a year after Brood War was released in 1999 when he was just starting
            Middle School. After playing through the campaigns several times he decided to try playing online. After
            awhile playing 1v1s he found the treasure that is UMS games. With hundreds of hours spent playing ‘Lurker
            Defense’ and ‘Run Ling Run’ the only thing that could stop him was when a call interrupted the dial-up
            connection. Eventually he moved onto other games, particularly FFXI. A lot of FFXI. Most would say an
            unhealthy amount of FFXI. When SC2 was announced it was like traveling back in time to the good days, and
            many hours were again spent playing the campaigns and lurker defense, though less 1v1s.
          </p>
          <p>
            Nowadays Eric mostly watches StarCraft instead of playing. Luckily StarCraft:Brood War and Starcraft 2
            tournaments are seeing a resurgence so there are plenty of games to watch. He also occasionally plays a card
            game called Magic, or something like that.
          </p>
        </Col>
        <Col md={4} sm={12}>
          <img className="w-100" src="/content/erichand.jpg" alt="Eric AKA OnekuoSora" />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default RenderToRoot(AboutPage);
