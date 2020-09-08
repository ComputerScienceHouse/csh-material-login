import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

const ThemeStylesheets = () => {
  const { theme } = useContext(ThemeContext);

  if (!theme?.stylesheets || theme.stylesheets.length < 1) {
    return null;
  }

  return (
    <>
      {theme.stylesheets.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </>
  );
};

export default ThemeStylesheets;
