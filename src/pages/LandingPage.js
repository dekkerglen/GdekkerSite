import React from 'react';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';
import { Row, Col, Card, CardBody } from 'reactstrap';

const LandingPage = () => {
  return (
    <MainLayout>
      <Card className="mt-4">
        <CardBody>
          <Row className="pt-4">
            <Col md={4} sm={12}>
              <img className="w-100" src="/content/gwen_headshot.png" alt="Gwen Headshot" />
            </Col>
            <Col md={8} sm={12}>
              <h4>About Me</h4>
              <p>
                Hi! I'm Gwen. I'm a full-stack developer that loves to dabble in all sorts of various technologies. You
                can check out a few of my projects <a href="/projects">here</a>, and also at my{' '}
                <a href="https://github.com/dekkerglen" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                .
              </p>
              <p>
                I'm incredibly passionate about web development - in my free time I'm often working on various personal
                projects. If you have an idea for a website, or you need some help setting up an online space for your
                business, don't hesisate to reach out!
              </p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </MainLayout>
  );
};

export default RenderToRoot(LandingPage);
