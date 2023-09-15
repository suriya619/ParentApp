import { Modal, Spinner } from "native-base";
import React from "react";

export const FullScreenLoader = ({ isVisible }) => {
  return (
    <Modal isOpen={isVisible} avoidKeyboard>
      <Modal.Content
        width="80px"
        height="80px"
        justifyContent="center"
        alignItems="center"
        _light={{ bg: "#fff" }}
        _dark={{ bg: "coolGray.800" }}
      >
        <Spinner
          size="lg"
          _light={{ color: "coolGray.800" }}
          _dark={{ color: "#fff" }}
        />
      </Modal.Content>
    </Modal>
  );
};
