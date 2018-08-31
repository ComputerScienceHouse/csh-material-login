import React, { PropTypes } from 'react';
import { renderToString } from 'react-dom/lib/ReactServerRendering';

const LOGO_ROOT_ID = 'logo';
const LOGO_CLASS = 'logo';
const LOGO_ROOT = document.getElementById(LOGO_ROOT_ID);

const replaceHtmlAtMountpoint = (html) => {
  LOGO_ROOT.innerHTML = html;
};

const Logo = (props) => {
  if (props.src.endsWith('svg')) {
    fetch(props.src).then((response) =>
      response.text().then((data) => {
        replaceHtmlAtMountpoint(data);
        const inlined = LOGO_ROOT.querySelector('svg');
        inlined.removeAttribute('height');
        inlined.setAttribute('class', LOGO_CLASS);
      }));
  } else {
    const img = <img src={props.src} className={LOGO_CLASS} />;
    replaceHtmlAtMountpoint(renderToString(img))
  }
  return null;
};

Logo.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Logo;
