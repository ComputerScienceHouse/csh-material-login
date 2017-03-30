import { connect } from 'react-redux';

import galleryManifest from '../../themes/manifest.json';
import { THEME_TYPES } from '../actions';
import Background from '../components/Background';

const getThemeData = (themeFromState) => {
  let themeData = {};

  switch (themeFromState.type) {
    case THEME_TYPES.GALLERY:
      themeData = galleryManifest.find(theme => theme.id === themeFromState.id);
      break;
  }

  return themeData;
};

const mapStateToProps = (state) => {
  const themeData = getThemeData(state.activeTheme);
  return {
    background: themeData.background,
    backgroundImage: themeData.backgroundImage,
  };
};

const ActiveBackground = connect(
  mapStateToProps
)(Background);

export default ActiveBackground;
