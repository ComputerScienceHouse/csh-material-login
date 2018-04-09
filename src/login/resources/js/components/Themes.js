import React, { Component } from 'react';

import ActiveStylesheets from '../containers/ActiveStylesheets';
import ActiveBackground from '../containers/ActiveBackground';
import ActiveLogo from "../containers/ActiveLogo";
import ThemesModalTrigger from '../containers/ThemesModalTrigger';
import TriggerableThemesModal from '../containers/TriggerableThemesModal';

const Themes = () => (
  <div>
    <ActiveStylesheets />
    <ActiveBackground />
    <ActiveLogo />
    <ThemesModalTrigger />
    <TriggerableThemesModal />
  </div>
);

export default Themes;
