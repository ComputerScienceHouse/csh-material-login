import React from "react";
import PropTypes from "prop-types";
import { Button, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import type { Theme } from "../lib/types";
import BackgroundPreview from "./BackgroundPreview";
import styles from "./ThemeCard.module.css";

const ThemeCard = ({
  theme,
  onClick,
}: {
  theme: Theme;
  onClick?: () => any;
}) => (
  <Card>
    <BackgroundPreview theme={theme} />
    <CardBody>
      <CardTitle className={styles.title}>
        <Button color="unstyled" className="stretched-link" onClick={onClick}>
          {theme.name}
        </Button>
      </CardTitle>
      <CardSubtitle className={styles.subtitle}>
        by {theme.authorName} ({theme.authorUsername})
      </CardSubtitle>
    </CardBody>
  </Card>
);

ThemeCard.propTypes = {
  theme: PropTypes.shape({
    name: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    authorUsername: PropTypes.string.isRequired,
    background: PropTypes.shape({
      color: PropTypes.string,
      image: PropTypes.string,
      size: PropTypes.string,
      repeat: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

ThemeCard.defaultProps = {
  onClick: () => {},
};

export default ThemeCard;
