import React, { PropTypes } from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import SelectableThemeCard from '../containers/SelectableThemeCard';
import { getThemeBackgroundFromManifest } from '../utils';
import { THEME_TYPES } from '../actions';

const ThemesModal = ({ open, onHide, gallery }) => (
  <Modal show={open} onHide={onHide} className="themes-modal">
    <Modal.Header closeButton>
      <Modal.Title>Themes</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Tabs id="themeSource">
        <Tab eventKey={1} title="Gallery">
          <Row>
            {gallery.map((theme) => (
                <SelectableThemeCard
                  key={theme.id}
                  id={theme.id}
                  type={THEME_TYPES.GALLERY}
                  name={theme.name}
                  authorUsername={theme.authorUsername}
                  authorName={theme.authorName}
                  background={getThemeBackgroundFromManifest(theme)} />
              ))}
          </Row>
        </Tab>
      </Tabs>
    </Modal.Body>
  </Modal>
);

ThemesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  gallery: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ThemesModal;
