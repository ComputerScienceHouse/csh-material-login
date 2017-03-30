import { connect } from 'react-redux';

import { showThemesModal } from '../actions';
import Trigger from '../components/Trigger';

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch(showThemesModal());
    }
  };
};

const ThemesModalTrigger = connect(
  undefined,
  mapDispatchToProps,
)(Trigger);

export default ThemesModalTrigger;
