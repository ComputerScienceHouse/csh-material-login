'use strict';

const jQuery = require('jquery');
global.jQuery = jQuery;
global.$ = jQuery;

const bootstrap = require('bootstrap');
require('particles.js');

import PreferencesChooser from './components/PreferencesChooser';
import PreferencesController from './controllers/PreferencesController';

const preferencesController = new PreferencesController();

const preferencesChooser = new PreferencesChooser("#preferences-toggle", preferencesController);
preferencesChooser.render();

//particlesJS('particles', particlesConfig);