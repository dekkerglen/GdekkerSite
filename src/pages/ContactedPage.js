import React from 'react';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';

import { Card, CardBody, Container } from 'reactstrap';

const ContactedPage = () => {
  return (
    <MainLayout>
      <div className="main-container">
        <Container fluid="xl" className="main-content">
          <Card className="mt-4">
            <CardBody>
              <h4 className="pt-3 centered">Success!</h4>
              <p className="centered">I've recieved your form submission, and will get back to you when I can.</p>
            </CardBody>
          </Card>
        </Container>
      </div>
    </MainLayout>
  );
};

export default RenderToRoot(ContactedPage);
