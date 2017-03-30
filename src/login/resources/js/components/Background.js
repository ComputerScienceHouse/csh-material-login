import React, { PropTypes } from 'react';

export const backgroundPropsToStyle = ({ background, backgroundImage, preview }) => {
  let style = {
    width: '100%',
  };

  if (preview) {
    Object.assign(style, {
      height: '130px',
    });
  } else {
    Object.assign(style, {
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: -1,
    });
  }

  if (backgroundImage) {
    style = Object.assign(style, {
      backgroundImage: 'url(' + backgroundImage + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    });
  } else if (background) {
    style = Object.assign(style, {
      backgroundColor: background.color,
      backgroundImage: background.image,
      backgroundSize: background.size,
      backgroundRepeat: background.repeat,
    });
  }

  return style;
};

const Background = (props) => (
  <div style={backgroundPropsToStyle(props)}></div>
);

Background.propTypes = {
  background: PropTypes.shape({
    color: PropTypes.string,
    image: PropTypes.string,
    size: PropTypes.string,
    repeat: PropTypes.string,
  }),
  backgroundImage: PropTypes.string,
  preview: PropTypes.bool,
};

export default Background;
