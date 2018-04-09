import { connect } from 'react-redux';

import Logo from '../components/Logo';
import { getThemeLogoById } from '../utils';

const mapStateToProps = (state) => {
  const src = getThemeLogoById(state.activeTheme.type, state.activeTheme.id);
  return {
    src,
  };
};

const ActiveLogo = connect(
  mapStateToProps
)(Logo);

export default ActiveLogo;
