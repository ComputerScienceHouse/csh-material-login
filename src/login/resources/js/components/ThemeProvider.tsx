import React from "react";
import { useLocalStorage } from "react-use";
import getThemeGallery from "../lib/themes";
import type { Theme } from "../lib/types";

const DEFAULT_THEME = "gradient";

type ThemeContextProps = {
  gallery: Theme[];
  theme: Theme;
  setTheme: (id: string) => void;
};

export const ThemeContext = React.createContext<Partial<ThemeContextProps>>({});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const gallery: Theme[] = getThemeGallery();
  const defaultTheme =
    gallery.find((t: Theme) => t.id === DEFAULT_THEME) ?? gallery[0];

  const [localStorage, setLocalStorage] = useLocalStorage("loginThemes", {
    activeTheme: {
      id: defaultTheme?.id,
    },
  });

  function setTheme(id: string): void {
    if (gallery.some((t: Theme) => t.id === id)) {
      setLocalStorage({ activeTheme: { id } });
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        gallery,
        theme:
          gallery.find((t: Theme) => t.id === localStorage?.activeTheme?.id) ??
          defaultTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
