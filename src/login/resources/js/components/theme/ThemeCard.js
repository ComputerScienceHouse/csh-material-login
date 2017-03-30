import React, {Component} from 'react';

import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';

import ThemeInfo from './ThemeInfo';

export default class ThemeCard extends Component {
  _createFooter() {
    return <ThemeInfo
              name={this.props.name}
              author_name={this.props.authorName}
              author_username={this.props.authorUsername} />;
  }

  _createPreview() {
    let previewStyle = {
      width: '100%',
      height: '130px',
      backgroundColor: '#cecece'
    };

    if (this.props.backgroundImage) {
      previewStyle = Object.assign(previewStyle, {
        backgroundImage: 'url(' + this.props.backgroundImage + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      });
    } else if (this.props.background) {
      previewStyle = Object.assign(previewStyle, {
        backgroundColor: this.props.background.color,
        backgroundImage: this.props.background.image,
        backgroundSize: this.props.background.size,
        backgroundRepeat: this.props.background.repeat
      });
    }

    return <div style={previewStyle}></div>;
  }

  render() {
    return (
      <Col xs={12} sm={6} md={3}>
        <Panel footer={this._createFooter()}>
          {this._createPreview()}
        </Panel>
      </Col>
    );
  }
}
