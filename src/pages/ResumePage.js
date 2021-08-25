import React from 'react';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';

import { Row, Col, Card, CardBody } from 'reactstrap';

const LandingPage = () => {
  return (
    <MainLayout>
      <Card className="mt-4">
        <CardBody>
          <h4>Experience</h4>
          <Row className="pt-4">
            <Col xs="4" sm="1">
              <a
                href="https://www.linkedin.com/company/amazon-web-services/mycompany/"
                target="_blank"
                rel="noreferrer"
              >
                <img className="w-100" src="/content/awslogo.jfif" alt="aws logo" />
              </a>
            </Col>
            <Col xs="8" sm="11">
              <h6>
                <a
                  href="https://www.linkedin.com/company/amazon-web-services/mycompany/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Amazon Web Services
                </a>{' '}
                - Software Development Engineer
              </h6>
              <p>
                <i>April 2020 - Present</i>
                <br />
                Worked in a team building an emergent service as part of AWS Migration Services.
              </p>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col xs="4" sm="1">
              <a href="https://www.linkedin.com/company/philips/" target="_blank" rel="noreferrer">
                <img className="w-100" src="/content/philipslogo.png" alt="philips logo" />
              </a>
            </Col>
            <Col xs="8" sm="11">
              <h6>
                <a href="https://www.linkedin.com/company/philips/" target="_blank" rel="noreferrer">
                  Philips
                </a>{' '}
                - Software Engineer
              </h6>
              <p>
                <i>August 2019 - April 2020</i>
                <br />
                Responsible for design, development and maintenance of several tools related to the research and
                development of an in-development medical device.
                <br />
                High emphasis on quality coding and documentation standards to comply with Philips and FDA standards.
              </p>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col xs="4" sm="1">
              <a href="https://www.linkedin.com/company/philips/" target="_blank" rel="noreferrer">
                <img className="w-100" src="/content/philipslogo.png" alt="philips logo" />
              </a>
            </Col>
            <Col xs="8" sm="11">
              <h6>
                <a href="https://www.linkedin.com/company/philips/" target="_blank" rel="noreferrer">
                  Philips
                </a>{' '}
                - Intern for IoT/Connected Sensing
              </h6>
              <p>
                <i>May 2018 - April 2019</i>
                <br />
                Developed software for verification and validation of an in-development medical device using bluetooth
                and websockets.
              </p>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col xs="4" sm="1">
              <a href="https://www.linkedin.com/company/bellerophon-therapeutics/" target="_blank" rel="noreferrer">
                <img className="w-100" src="/content/bellerophonlogo.png" alt="bellerophon logo" />
              </a>
            </Col>
            <Col xs="8" sm="11">
              <h6>
                <a href="https://www.linkedin.com/company/bellerophon-therapeutics/" target="_blank" rel="noreferrer">
                  Bellerophon Therapuetics
                </a>{' '}
                - Software Engineer Intern
              </h6>
              <p>
                <i>May 2017 - August 2018</i>
                <br />
                Designed and built a medical mobile application for use in a clinical trial setting. The mobile
                application has been deployed and is currently being used by clinicians to program devices to treat
                patients.
              </p>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="mt-4">
        <CardBody>
          <h4>Education</h4>
          <Row className="pt-4">
            <Col xs="4" sm="1">
              <a href="https://www.linkedin.com/school/ccisatnu/" target="_blank" rel="noreferrer">
                <img className="w-100" src="/content/neu.png" alt="NEU logo" />
              </a>
            </Col>
            <Col xs="8" sm="11">
              <h6>
                <a href="https://www.linkedin.com/school/ccisatnu/" target="_blank" rel="noreferrer">
                  Northeastern University College of Computer and Information Science
                </a>
              </h6>
              <h6>Master of Science - MS, Computer Science</h6>
              <p>
                <i>2019 - In Progress</i>
              </p>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col xs="4" sm="1">
              <a href="https://www.linkedin.com/school/arizona-state-university/" target="_blank" rel="noreferrer">
                <img className="w-100" src="/content/asu.png" alt="ASU logo" />
              </a>
            </Col>
            <Col xs="8" sm="11">
              <h6>
                <a href="https://www.linkedin.com/school/arizona-state-university/" target="_blank" rel="noreferrer">
                  Arizona State University
                </a>
              </h6>
              <h6>Bachelor of Science - BS, Software Engineering</h6>
              <p>
                <i>2014 - 2019</i>
              </p>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="my-4">
        <CardBody>
          <h4>Skills</h4>
          <hr />
          <h5>Languages</h5>
          <Row className="pt-4">
            <Col xs="4" sm="1">
              <img className="w-100" src="/content/js.jpg" alt="js logo" />
            </Col>
            <Col xs="8" sm="11">
              <h6>JavaScript</h6>
              <p>Extensive frontend and backend experience using Javascript.</p>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col xs="4" sm="1">
              <img className="w-100" src="/content/java.png" alt="java logo" />
            </Col>
            <Col xs="8" sm="11">
              <h6>Java</h6>
              <p>
                Main language used for development at AWS for backend systems.
                <br />
                Majority of bachelor's coursework completed in Java.
              </p>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col xs="4" sm="1">
              <img className="w-100" src="/content/csharp.png" alt="csharp logo" />
            </Col>
            <Col xs="8" sm="11">
              <h6>C#</h6>
              <p>
                Main language used for development at Philips and Bellerophon. Experience using C# for backend
                development (ASP.NET), and mobile app development (Xamarin).
              </p>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col xs="4" sm="1">
              <img className="w-100" src="/content/python.png" alt="python logo" />
            </Col>
            <Col xs="8" sm="11">
              <h6>Python</h6>
              <p>Majority of master's coursework completed in Python.</p>
            </Col>
          </Row>
          <hr />
          <h5>Technologies</h5>
          <Row className="pt-4">
            <Col xs="4" sm="1">
              <img className="w-100" src="/content/awslogo.jfif" alt="aws logo" />
            </Col>
            <Col xs="8" sm="11">
              <h6>AWS</h6>
              <p>
                Experience building and managing scalable and durable web applications and services using AWS best
                practices.
              </p>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col xs="4" sm="1">
              <img className="w-100" src="/content/react.png" alt="react logo" />
            </Col>
            <Col xs="8" sm="11">
              <h6>React</h6>
              <p>Preffered front end framework. Majority of personal projects built using React.</p>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col xs="4" sm="1">
              <img className="w-100" src="/content/nodejs.png" alt="nodejs logo" />
            </Col>
            <Col xs="8" sm="11">
              <h6>Node.js</h6>
              <p>Preffered back end framework. Majority of personal projects built using Node.js.</p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </MainLayout>
  );
};

export default RenderToRoot(LandingPage);
