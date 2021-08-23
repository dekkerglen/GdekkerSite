import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Table } from 'reactstrap';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';

const ContactPage = ({ title, content }) => (
  <MainLayout>
    <h4 className="pt-2 centered">{title}</h4>
    {content.map((item) =>
      item.table ? (
        <Table bordered responsive className="mt-lg-3">
          {item.table.map((row) => (
            <tr>
              <th scope="col">{row[0]}</th>
              <td>{row[1]}</td>
            </tr>
          ))}
        </Table>
      ) : (
        <Row key={item.label} className={item.label.length > 0 ? 'mt-3' : 'my-0'}>
          <Col xs="12" sm="3">
            <strong>{item.label}</strong>
          </Col>
          <Col xs="12" sm="9">
            <p>{item.text}</p>
          </Col>
        </Row>
      ),
    )}
    <span data-ccpa-link="1" />
  </MainLayout>
);

ContactPage.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default RenderToRoot(ContactPage);
