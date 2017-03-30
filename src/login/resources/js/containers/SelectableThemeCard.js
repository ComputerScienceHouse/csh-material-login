import { connect } from 'react-redux';

import { setActiveTheme, THEME_TYPES } from '../actions';
import Card from '../components/ThemeCard/Card';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.id === state.activeTheme,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setActiveTheme(ownProps.type, ownProps.id));
    }
  };
};

const SelectableThemeCard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Card);

export default SelectableThemeCard;
