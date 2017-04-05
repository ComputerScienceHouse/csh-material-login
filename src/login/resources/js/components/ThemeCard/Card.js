import React, { PropTypes } from 'react';

import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';

import Background from '../Background';
import Footer from './Footer';

const Card = ({ name, authorName, authorUsername, background, backgroundUrl, onClick }) => (
  <Col xs={12} sm={6} md={3}>
    <Panel
      onClick={onClick}
      footer={<Footer
                name={name}
                authorName={authorName}
                authorUsername={authorUsername} />}>
      <Background
        background={background}
        preview={true} />
    </Panel>
  </Col>
);

Card.propTypes = {
  name: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorUsername: PropTypes.string.isRequired,
  background: PropTypes.shape({
    color: PropTypes.string,
    image: PropTypes.string,
    size: PropTypes.string,
    repeat: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func
};

export default Card;
