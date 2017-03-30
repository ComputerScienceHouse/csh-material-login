import React, {Component} from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import ThemeCard from './theme/ThemeCard';

export default class ThemesModal extends Component {
  _generateGallery() {
    return this.props.gallery.map((theme, index) => {
      return (
        <ThemeCard
          key={theme.id}
          name={theme.name}
          authorUsername={theme.authorUsername}
          authorName={theme.authorName}
          background={theme.background}
          backgroundImage={theme.backgroundImage} />
      );
    });
  }

  render() {
    return (
      <Modal show={this.props.open} onHide={this.props.onHide} className="themes-modal">
        <Modal.Header closeButton>
          <Modal.Title>Themes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs id="themeSource">
            <Tab eventKey={1} title="Gallery">
              <Row>
                {this._generateGallery()}
              </Row>
            </Tab>
            <Tab eventKey={2} title="My Themes">
              <Button bsStyle="primary" className="btn-add-theme"><Glyphicon glyph="plus" /> Add Custom Theme</Button>
              <Row>
                {this._generateGallery()}
              </Row>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    )
  }
}
