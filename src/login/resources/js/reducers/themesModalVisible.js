import { SHOW_THEMES_MODAL, HIDE_THEMES_MODAL } from '../actions';

const themesModalVisible = (state = false, action) => {
  switch (action.type) {
    case SHOW_THEMES_MODAL:
      return true;
    case HIDE_THEMES_MODAL:
      return false;
    default:
      return state;
  }
};

export default themesModalVisible;
