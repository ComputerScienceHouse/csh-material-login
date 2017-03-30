/*
 * Action types
 */

export const SHOW_THEMES_MODAL = 'SHOW_THEMES_MODAL';
export const HIDE_THEMES_MODAL = 'HIDE_THEMES_MODAL';

export const SET_ACTIVE_THEME = 'SET_ACTIVE_THEME';


/*
 * Theme types
 */

export const THEME_TYPES = {
  GALLERY: 'GALLERY',
  CUSTOM: 'CUSTOM'
};


/*
 * Action creators
 */

export const showThemesModal = () => {
  return {
    type: SHOW_THEMES_MODAL,
  };
};

export const hideThemesModal = () => {
  return {
    type: HIDE_THEMES_MODAL,
  };
};

export const setActiveTheme = (themeType, themeId) => {
  return {
    type: SET_ACTIVE_THEME,
    themeType: themeType,
    themeId: themeId,
  };
};
