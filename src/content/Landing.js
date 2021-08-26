import React from 'react';

import ContentLayout from 'layouts/ContentLayout';

import { Row, Col, Card, CardBody } from 'reactstrap';

const Landing = () => {
  return (
    <ContentLayout>
      <Card className="mt-4">
        <CardBody>
          <Row>
            <Col md={4} sm={12}>
              <Card className="outcrop">
                <img className="w-100 img-corners" src="/content/gwen_headshot.png" alt="Gwen Headshot" />
              </Card>
            </Col>
            <Col md={8} sm={12}>
              <h4>About Me</h4>
              <p>
                Hi! I'm Gwen. I'm a full-stack developer that loves to dabble in all sorts of technologies. You can
                check out a few of my projects <a href="/?page=1">here</a>, and also at my{' '}
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
    </ContentLayout>
  );
};

export default Landing;
