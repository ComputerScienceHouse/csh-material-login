import React, { Component } from 'react';

import ActiveStylesheets from '../containers/ActiveStylesheets';
import ActiveBackground from '../containers/ActiveBackground';
import ThemesModalTrigger from '../containers/ThemesModalTrigger';
import TriggerableThemesModal from '../containers/TriggerableThemesModal';

const Themes = () => (
  <div>
    <ActiveStylesheets />
    <ActiveBackground />
    <ThemesModalTrigger />
    <TriggerableThemesModal />
  </div>
);

export default Themes;
