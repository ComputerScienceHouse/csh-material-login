import React from "react";
import { useToggle } from "react-use";
import ThemeProvider from "./ThemeProvider";
import ThemeStylesheets from "./ThemeStylesheets";
import ThemeBackground from "./ThemeBackground";
import ThemesToggle from "./ThemesToggle";
import ThemesModal from "./ThemesModal";

const App = () => {
  const [modalOpen, toggleModal] = useToggle(false);

  return (
    <ThemeProvider>
      <ThemeStylesheets />
      <ThemeBackground />
      <ThemesToggle onClick={toggleModal} />
      <ThemesModal isOpen={modalOpen} toggle={toggleModal} />
    </ThemeProvider>
  );
};

export default App;
