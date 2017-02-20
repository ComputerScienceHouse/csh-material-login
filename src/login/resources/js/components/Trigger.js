import React, {Component} from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

export default class Trigger extends Component {
  render() {
    const tooltip = (
      <Tooltip id="triggerTooltip">Themes</Tooltip>
    );

    return (
      <div className="themes-trigger" onClick={this.props.callback}>
        <OverlayTrigger placement="left" overlay={tooltip}>
          <Glyphicon glyph="cog" />
        </OverlayTrigger>
      </div>
    );
  }
}