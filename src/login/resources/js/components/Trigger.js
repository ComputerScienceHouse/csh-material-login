import React, { PropTypes } from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

const Trigger = ({ onClick }) => (
  <div className="themes-trigger" onClick={onClick}>
    <OverlayTrigger placement="left" overlay={<Tooltip id="triggerTooltip">Themes</Tooltip>}>
      <Glyphicon glyph="cog" />
    </OverlayTrigger>
  </div>
);

Trigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Trigger;
