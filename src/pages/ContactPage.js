import React from 'react';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';

import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const ContactPage = () => {
  return (
    <MainLayout>
      <Row>
        <Col className="pt-4" sm={6}>
          <h3 className="centered">Information</h3>
          <b>Your Hosts:</b>
          <div className="ml-4">Brad (DrRuler) & Eric (OnekuoSora)</div>
          <br />
          <b>Twitter:</b>
          <div className="ml-4">
            Brad -{' '}
            <a href="https://twitter.com/DrRuler" target="_blank" rel="noopener noreferrer">
              @DrRuler
            </a>
          </div>
          <div className="ml-4">
            Eric -{' '}
            <a href="https://twitter.com/OnekuoSora" target="_blank" rel="noopener noreferrer">
              @OnekuoSora
            </a>
          </div>
          <br />
          <b>Show Email:</b>
          <div className="ml-4">
            <a href="mailto:solelysingleton@gmail.com">solelysingleton@gmail.com</a>
          </div>
          <br />
          <br />
          <b>Address:</b>
          <div className="ml-4">PO Box 70893</div>
          <div className="ml-4">Rochester Hills, MI</div>
          <div className="ml-4">48307 </div>
          <br />
          <h3 className="centered">Support the Show!</h3>
          <p>
            If you enjoy our content, and would like to support us to help make more of the content you enjoy, use any
            of the links below.
          </p>
          <b>Patreon:</b>
          <div className="ml-4">
            <a href="https://www.patreon.com/SolelySingleton">https://www.patreon.com/SolelySingleton</a>
          </div>
          <br />
          <b>Merchandise:</b>
          <div className="ml-4">
            <a href="https://www.inkedgaming.com/collections/artists-solely-singleton?rfsn=4880595.65410f&utm_source=refersion&utm_medium=affiliate&utm_campaign=4880595.65410f">
              https://www.inkedgaming.com/collections/artists-solely-singleton
            </a>
          </div>
          <br />
        </Col>
        <Col className="pt-4" sm={6}>
          <h3 className="centered">Contact Form</h3>
          <p>
            You can use the form below to send questions and comments to the show’s email address. We’ll get back to you
            as soon as possible.
          </p>
          <Card>
            <CardBody>
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
                  <br />
                  <Label classfor="name">Quiz (Required)</Label>
                  <br />
                  <Label for="quiz">What does the G in WUBRG stand for?</Label>
                  <Input type="text" name="quiz" id="quiz" />
                </FormGroup>
                <Button className="pt-2" outline block color="primary">
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default RenderToRoot(ContactPage);
