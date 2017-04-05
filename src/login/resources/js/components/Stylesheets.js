import React, { PropTypes } from 'react';

const Stylesheets = ({ hrefs }) => (
  <div>
  {hrefs.map((href, index) => (
      <link
        key={index}
        rel="stylesheet"
        href={href} />
  ))}
  </div>
);

Stylesheets.propTypes = {
  hrefs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Stylesheets;
