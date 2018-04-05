import React, { PropTypes } from 'react';
import { renderToString } from 'react-dom/lib/ReactServerRendering';

const fetchRawSvg = (url) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, false);
  request.send();
  return request.responseText;
};

const Logo = (props) => {
  const existing = document.querySelector('.logo');
  if (existing !== null) existing.remove();

  if (props.src.endsWith('svg')) {
    const elementHtml = fetchRawSvg(props.src);
    document.getElementById('loginBox').insertAdjacentHTML(
      'afterbegin',
      elementHtml
    );
    const inlined = document.querySelector('svg');
    inlined.removeAttribute('height');
    inlined.setAttribute('class', 'logo');
  } else {
    const img = <img src={props.src} className={'logo'} />;
    document.getElementById('loginBox').insertAdjacentHTML(
      'afterbegin',
      renderToString(img)
    );
  }
  return null;
};

Logo.propTypes = {
  src: PropTypes.string,
};

export default Logo;
