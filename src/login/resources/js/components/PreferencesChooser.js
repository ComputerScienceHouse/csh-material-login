import ClassUtil from '../utils/ClassUtil';
import Background from '../models/Background';

export default class PreferencesChooser {
  constructor(selector, preferencesController) {
    this.selector = selector;
    this.preferencesController = preferencesController;
  }

  render() {
    const controller = this.preferencesController;
    const prefs = controller.preferences;
    const toggle = document.querySelector(this.selector);

    // Add event listener for Bootstrap dropdown
    toggle.addEventListener('click', () => {
      toggle.parentNode.classList.toggle('open');
    });

    // Add custom close event listener so the dropdown doesn't close when an option is chosen
    document.addEventListener('click', e => {
      if (!Array.prototype.includes.call(
        toggle.parentNode.querySelectorAll("*"), e.target)) {
        ClassUtil.removeClass(toggle.parentNode, 'open');
      }
    });

    // Add event listener for each background radio button
    const backgroundRadios =
      toggle.parentNode.querySelectorAll("input[type=radio][name=background]");
    backgroundRadios.forEach(radio => {
      // While we're iterating through these, check the one that's currently selected
      if (radio.value === prefs.background.name.toLowerCase()) {
        radio.checked = true;
      }

      radio.addEventListener('change', () => {
        // TODO: Custom background modal
        if (radio.checked) {
          let enumEquiv = Background.enumValueOf(radio.value.toUpperCase());
          if (typeof enumEquiv === "undefined") {
            console.error("Invalid background choice: " + radio.value);
          } else {
            prefs.background = enumEquiv;
            controller.save();
          }
        }
      });
    });

        // Add event listener for particles checkbox
    const particlesSwitch =
      toggle.parentNode.querySelector("#prefShowParticles");
    particlesSwitch.checked = prefs.particles;
    particlesSwitch.addEventListener('change', () => {
      prefs.particles = particlesSwitch.checked;
      controller.save();
    });
  }
}
