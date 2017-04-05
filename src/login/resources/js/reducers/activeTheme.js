import { THEME_TYPES, SET_ACTIVE_THEME } from '../actions';
import gradientTheme from '../../themes/gradient/theme.json';

const DEFAULT_THEME = {
  type: THEME_TYPES.GALLERY,
  id: gradientTheme.id
};

const activeTheme = (state = DEFAULT_THEME, action) => {
  switch (action.type) {
    case SET_ACTIVE_THEME:
      return {
        type: action.themeType,
        id: action.themeId,
      };
    default:
      return state;
  }
};

export default activeTheme;
