import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useToggle } from "react-use";
import { FaCog } from "react-icons/fa";
import { Button, Tooltip } from "reactstrap";
import { ThemeContext } from "./ThemeProvider";
import styles from "./ThemesToggle.module.css";

const ThemesToggle = ({ onClick }: { onClick: () => any }) => {
  const [tooltipOpen, toggle] = useToggle(false);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.toggle}>
      <Button color="link" id="ThemesToggle" onClick={onClick}>
        <FaCog fill={theme?.dark ? "#fff" : "#000"} />
      </Button>
      <Tooltip
        placement="left"
        isOpen={tooltipOpen}
        target="ThemesToggle"
        toggle={toggle}
      >
        Themes
      </Tooltip>
    </div>
  );
};

ThemesToggle.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ThemesToggle;
