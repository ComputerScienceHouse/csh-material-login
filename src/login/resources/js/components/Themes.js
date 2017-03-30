import React, {Component} from 'react';

import Trigger from './Trigger';
import ThemesModal from './ThemesModal';

import galleryManifest from '../../themes/manifest.json';

export default class Themes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  openModal() {
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }

  _

  render() {
    return (
      <div>
        <Trigger callback={this.openModal.bind(this)} />
        <ThemesModal
          open={this.state.showModal}
          onHide={this.closeModal.bind(this)}
          gallery={galleryManifest} />
      </div>
    );
  }
}
