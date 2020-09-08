import React from "react";
import PropTypes from "prop-types";
import type { Theme } from "../lib/types";
import useBackgroundStyle from "../hooks/useBackgroundStyle";

const BackgroundThumbnail = ({ theme }: { theme: Theme }) => {
  const backgroundStyle = useBackgroundStyle(theme, true);

  if (!backgroundStyle) {
    return null;
  }

  return <div style={backgroundStyle} />;
};

BackgroundThumbnail.propTypes = {
  theme: PropTypes.shape({
    background: PropTypes.shape({
      color: PropTypes.string,
      image: PropTypes.string,
      size: PropTypes.string,
      repeat: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default BackgroundThumbnail;
