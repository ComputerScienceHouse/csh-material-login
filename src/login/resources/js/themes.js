import 'jquery';
import 'bootstrap';
import PreferencesChooser from './components/PreferencesChooser';
import PreferencesController from './controllers/PreferencesController';

const preferencesController = new PreferencesController();

const preferencesChooser =
  new PreferencesChooser("#preferences-toggle", preferencesController);

preferencesChooser.render();

// particlesJS('particles', particlesConfig);
