import React, { PropTypes } from 'react';

const propsToStyle = ({ background, preview }) => {
  let style = {
    width: '100%',
    backgroundColor: background.color,
    backgroundImage: background.image,
    backgroundSize: background.size,
    backgroundRepeat: background.repeat,
  };

  if (preview) {
    style.height = '130px';
  } else {
    Object.assign(style, {
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: -1,
    });
  }

  return style;
};

const Background = (props) => (
  <div style={propsToStyle(props)}></div>
);

Background.propTypes = {
  background: PropTypes.shape({
    color: PropTypes.string,
    image: PropTypes.string,
    size: PropTypes.string,
    repeat: PropTypes.string,
  }).isRequired,
  preview: PropTypes.bool,
};

export default Background;
