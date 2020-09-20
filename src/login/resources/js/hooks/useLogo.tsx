import React, { useEffect, useContext } from "react";
import { renderToString } from "react-dom/server";
import { ThemeContext } from "../components/ThemeProvider";

const LOGO_ROOT_ID = "logo";
const LOGO_CLASS = "logo";
const LOGO_DARK_CLASS = "logo logo-dark";

const useLogo = () => {
  const { theme } = useContext(ThemeContext);
  const logoSrc = theme?.logo;
  const darkMode = theme?.dark;

  useEffect(() => {
    const logo = document.getElementById(LOGO_ROOT_ID);

    if (logo && logoSrc) {
      if (logoSrc.endsWith("svg")) {
        fetch(logoSrc)
          .then((resp) => resp.text())
          .then((html) => {
            logo.innerHTML = html;

            const inline = logo.querySelector("svg");
            if (inline) {
              inline.removeAttribute("height");
              inline.setAttribute(
                "class",
                darkMode ? LOGO_DARK_CLASS : LOGO_CLASS
              );
            }
          });
      } else {
        const img = (
          <img alt="" src={logoSrc} className={LOGO_CLASS} aria-hidden />
        );
        logo.innerHTML = renderToString(img);
      }
    }
  }, [logoSrc, theme, darkMode]);

  useEffect(() => {
    const logo = document.getElementById(LOGO_ROOT_ID);
    const inline = logo?.querySelector("svg");

    if (inline) {
      inline.setAttribute("class", darkMode ? LOGO_DARK_CLASS : LOGO_CLASS);
    }
  }, [darkMode]);
};

export default useLogo;
