import { connect } from 'react-redux';

import galleryManifest from '../../themes/manifest.json';
import { showThemesModal, hideThemesModal } from '../actions';
import ThemesModal from '../components/ThemesModal';

const mapStateToProps = (state, ownProps) => {
  return {
    open: state.themesModalVisible,
    gallery: galleryManifest,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHide: () => {
      dispatch(hideThemesModal())
    }
  }
}

const ThemesModalTrigger = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThemesModal);

export default ThemesModalTrigger;
