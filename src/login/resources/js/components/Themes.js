import React, { Component } from 'react';

import ActiveBackground from '../containers/ActiveBackground';
import ThemesModalTrigger from '../containers/ThemesModalTrigger';
import TriggerableThemesModal from '../containers/TriggerableThemesModal';

const Themes = () => (
  <div>
    <ActiveBackground />
    <ThemesModalTrigger />
    <TriggerableThemesModal />
  </div>
);

export default Themes;
