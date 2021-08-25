import React from 'react';

import ContentLayout from 'layouts/ContentLayout';

import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const ContactPage = () => {
  return (
    <ContentLayout>
      <Card className="mt-4">
        <CardBody>
          <h3>Contact Me</h3>
          <Form action="/contact" method="post">
            <FormGroup>
              <Label for="name">Your Name</Label>
              <Input type="text" name="name" id="name" />
              <Label for="email">Your Email (required)</Label>
              <Input type="email" name="email" id="name" />
              <Label for="subject">Subject (required)</Label>
              <Input type="text" name="subject" id="subject" />
              <Label for="message">Your Message (required)</Label>
              <Input type="textarea" name="message" id="message" />
            </FormGroup>
            <Button className="pt-2" outline block color="success">
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>
    </ContentLayout>
  );
};

export default ContactPage;
