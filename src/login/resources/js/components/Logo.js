import React, { PropTypes } from 'react';
import { renderToString } from 'react-dom/lib/ReactServerRendering';

const LOGIN_BOX_ID = 'login-box';
const LOGO_CLASS = 'logo';

const insertHtmlAtMountpoint = (html) =>
  document.getElementById(LOGIN_BOX_ID).insertAdjacentHTML('afterbegin', html);

const Logo = (props) => {
  const existing = document.querySelector(`.${LOGO_CLASS}`);
  if (existing !== null) existing.remove();

  if (props.src.endsWith('svg')) {
    fetch(props.src).then((response) =>
      response.text().then((data) => {
        insertHtmlAtMountpoint(data);
        const inlined = document.querySelector('svg');
        inlined.removeAttribute('height');
        inlined.setAttribute('class', LOGO_CLASS);
      }));
  } else {
    const img = <img src={props.src} className={LOGO_CLASS} />;
    insertHtmlAtMountpoint(renderToString(img))
  }
  return null;
};

Logo.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Logo;
