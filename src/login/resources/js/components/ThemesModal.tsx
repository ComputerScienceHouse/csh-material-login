import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Alert, Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import { ThemeContext } from "./ThemeProvider";
import ThemeCard from "./ThemeCard";
import styles from "./ThemesModal.module.css";

const ThemesModal = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => {
  const { gallery, setTheme } = useContext(ThemeContext);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      scrollable
      className={`modal-dialog-centered ${styles.modal}`}
    >
      <ModalHeader toggle={toggle}>Themes</ModalHeader>
      <ModalBody>
        <Row>
          {Array.isArray(gallery) && gallery.length > 0 ? (
            gallery.map((theme) => {
              const handleClick = () => {
                if (typeof setTheme === "function") {
                  setTheme(theme.id);
                }

                toggle();
              };

              return (
                <Col xs={12} sm={6} md={3} className={styles.card}>
                  <ThemeCard
                    key={theme.id}
                    theme={theme}
                    onClick={handleClick}
                  />
                </Col>
              );
            })
          ) : (
            <Alert color="info">There are no themes available.</Alert>
          )}
        </Row>
      </ModalBody>
    </Modal>
  );
};

ThemesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default ThemesModal;
