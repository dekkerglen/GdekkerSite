import React from 'react';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';

import { Card, CardBody } from 'reactstrap';

const ContactedPage = () => {
  return (
    <MainLayout>
      <Card className="mt-4">
        <CardBody>
          <h4 className="pt-3 centered">Success!</h4>
          <p className="centered">I've recieved your form submission, and will get back to you when I can.</p>
        </CardBody>
      </Card>
    </MainLayout>
  );
};

export default RenderToRoot(ContactedPage);
