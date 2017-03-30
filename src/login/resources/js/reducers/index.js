import { combineReducers } from 'redux';

import activeTheme from './activeTheme';
import themesModalVisible from './themesModalVisible';

const reducer = combineReducers({
  activeTheme,
  themesModalVisible,
});

export default reducer;
