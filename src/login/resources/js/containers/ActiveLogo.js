import { connect } from 'react-redux';

import Logo from '../components/Logo';
import { getThemeLogoById } from '../utils';

const mapStateToProps = (state) => {
  const url = getThemeLogoById(state.activeTheme.type, state.activeTheme.id);
  return {
    src: url,
  };
};

const ActiveLogo = connect(
  mapStateToProps
)(Logo);

export default ActiveLogo;
