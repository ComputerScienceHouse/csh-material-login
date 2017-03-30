import React, { PropTypes } from 'react';

const Footer = ({ name, authorName, authorUsername }) => (
  <div>
    <strong>{name}</strong>
    <br/>
    <i>by {authorName} ({authorUsername})</i>
  </div>
);

Footer.propTypes = {
  name: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorUsername: PropTypes.string.isRequired,
};

export default Footer;
