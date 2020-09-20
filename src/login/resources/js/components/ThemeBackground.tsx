import React, { useContext } from "react";
import useLogo from "../hooks/useLogo";
import useBackgroundStyle from "../hooks/useBackgroundStyle";
import { ThemeContext } from "./ThemeProvider";

const ThemeBackground = () => {
  useLogo();
  const { theme } = useContext(ThemeContext);
  const backgroundStyle = useBackgroundStyle(theme);

  if (!backgroundStyle) {
    return null;
  }

  return <div style={backgroundStyle} />;
};

export default ThemeBackground;
