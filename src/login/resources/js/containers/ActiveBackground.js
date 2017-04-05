import { connect } from 'react-redux';

import Background from '../components/Background';
import { getThemeBackgroundById } from '../utils';

const mapStateToProps = (state) => {
  return {
    background: getThemeBackgroundById(state.activeTheme.type, state.activeTheme.id),
  };
};

const ActiveBackground = connect(
  mapStateToProps
)(Background);

export default ActiveBackground;
