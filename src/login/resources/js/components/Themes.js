import React, {Component} from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import Trigger from './Trigger';

export default class Themes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  render() {
    const themeInfo = (
      <div>
        <strong>Original Photo</strong>
        <br/>
        <i>by Julien Eid (jeid)</i>
      </div>
    );

    return (
      <div>
        <Trigger callback={this.open.bind(this)}/>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)} className="themes-modal">
          <Modal.Header closeButton>
            <Modal.Title>Themes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs id="themeSource">
              <Tab eventKey={1} id="gallery" title="Gallery">
                <Row>
                  <Col xs={12} sm={6} md={3}>
                    <Panel footer={themeInfo}>
                      <img src="https://webauth.csh.rit.edu/assets/images/reedoriginal.png" alt="Original Photo"/>
                    </Panel>
                  </Col>
                  <Col xs={12} sm={6} md={3}>
                    <Panel footer={themeInfo}>
                      <img src="https://webauth.csh.rit.edu/assets/images/reedoriginal.png" alt="Original Photo"/>
                    </Panel>
                  </Col>
                  <Col xs={12} sm={6} md={3}>
                    <Panel footer={themeInfo}>
                      <img src="https://webauth.csh.rit.edu/assets/images/reedoriginal.png" alt="Original Photo"/>
                    </Panel>
                  </Col>
                  <Col xs={12} sm={6} md={3}>
                    <Panel footer={themeInfo}>
                      <img src="https://webauth.csh.rit.edu/assets/images/reedoriginal.png" alt="Original Photo"/>
                    </Panel>
                  </Col>
                  <Col xs={12} sm={6} md={3}>
                    <Panel footer={themeInfo}>
                      <img src="https://webauth.csh.rit.edu/assets/images/reedoriginal.png" alt="Original Photo"/>
                    </Panel>
                  </Col>
                  <Col xs={12} sm={6} md={3}>
                    <Panel footer={themeInfo}>
                      <img src="https://webauth.csh.rit.edu/assets/images/reedoriginal.png" alt="Original Photo"/>
                    </Panel>
                  </Col>
                  <Col xs={12} sm={6} md={3}>
                    <Panel footer={themeInfo}>
                      <img src="https://webauth.csh.rit.edu/assets/images/reedoriginal.png" alt="Original Photo"/>
                    </Panel>
                  </Col>
                  <Col xs={12} sm={6} md={3}>
                    <Panel footer={themeInfo}>
                      <img src="https://webauth.csh.rit.edu/assets/images/reedoriginal.png" alt="Original Photo"/>
                    </Panel>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey={2} id="myThemes" title="My Themes">
                <Button bsStyle="primary" className="btn-add-theme"><Glyphicon glyph="plus" /> Add Custom Theme</Button>
                <Row>
                  <Col xs={12} sm={6} md={3}>
                    <Panel footer={themeInfo}>
                      <img src="https://webauth.csh.rit.edu/assets/images/reedoriginal.png" alt="Original Photo"/>
                    </Panel>
                  </Col>
                  <Col xs={12} sm={6} md={3}>
                    <Panel footer={themeInfo}>
                      <img src="https://webauth.csh.rit.edu/assets/images/reedoriginal.png" alt="Original Photo"/>
                    </Panel>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}