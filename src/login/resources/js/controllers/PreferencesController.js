import Preferences from '../models/Preferences';
import Background from '../models/Background';
import Store from 'es6-store';

export default class PreferencesController {
  constructor() {
    this.store = new Store();
    this.defaultPreferences = new Preferences({
      background: Background.DEFAULT,
      customBackgroundUrl: null,
      particles: true,
      particlesConfig: {}
    });

    this.load();
  }

  load() {
    let loadedConfig = this.store.get('csh_login_preferences');
    if (typeof loadedConfig === "undefined") {
      this.preferences = this.defaultPreferences;
    } else {
      this.preferences = Store.deserialize(loadedConfig);
    }
  }

  save() {
    return this.store.set('csh_login_preferences',
      Store.serialize(this.preferences));
  }

  // clear() {
  //   return this.store.remove('csh_login_preferences');
  // }
}
