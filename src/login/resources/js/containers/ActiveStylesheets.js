import { connect } from 'react-redux';

import Stylesheets from '../components/Stylesheets';
import { getThemeStylesheetsById } from '../utils';

const mapStateToProps = (state) => {
  return {
    hrefs: getThemeStylesheetsById(state.activeTheme.type, state.activeTheme.id),
  };
};

const ActiveStylesheets = connect(
  mapStateToProps
)(Stylesheets);

export default ActiveStylesheets;
