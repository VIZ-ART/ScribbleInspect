import React, { useState } from "react";
import Modal from "react-modal";

const DialogWindow = ({ isModalOpen, closeModal, successModal, modalText }) => {
  const [isCancelButtonHovered, setCancelButtonHovered] = useState(false);
  const [isSaveButtonHovered, setSaveButtonHovered] = useState(false);
  const modalStyles = {
    overlay: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      position: "relative",
      top: "auto",
      left: "auto",
      right: "auto",
      bottom: "auto",
      maxWidth: "250px",
      width: "100%",
      maxHeight: "130px",
      margin: "auto",
      padding: "20px",
    },
    btnContainer: {
      marginTop: "20px",
      display: "flex",
      justifyContent: "space-around",
    },
    cancelBtn: {
      cursor: "pointer",
      color: "var(--white)",
      background: isCancelButtonHovered ? "var(--black)" : "var(--grey-500)",
      border: "transparent",
      borderRadius: "var(--borderRadius)",
      letterSpacing: "var(--letterSpacing)",
      padding: "0.375rem 0.75rem",
      boxShadow: "var(--shadow-2)",
      transition: "var(--transition)",
      textTransform: "capitalize",
      display: "inline-block",
      height: "35px",
    },
    cancelBtnHover: {
      background: "var(--black)",
    },
    saveBtn: {
      cursor: "pointer",
      color: "var(--white)",
      background: isSaveButtonHovered
        ? "var(--primary-700)"
        : "var(--primary-500)",
      border: "transparent",
      borderRadius: "var(--borderRadius)",
      letterSpacing: "var(--letterSpacing)",
      padding: "0.375rem 0.75rem",
      boxShadow: "var(--shadow-2)",
      transition: "var(--transition)",
      textTransform: "capitalize",
      display: "inline-block",
      height: "35px",
    },
    submitBtnHover: {
      background: "var(--primary-700)",
      boxShadow: "var(--shadow-3)",
    },
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      ariaHideApp={false}
    >
      <h5>{modalText}</h5>
      <div style={modalStyles.btnContainer}>
        <button
          style={modalStyles.cancelBtn}
          onClick={closeModal}
          onMouseEnter={() => setCancelButtonHovered(true)}
          onMouseLeave={() => setCancelButtonHovered(false)}
        >
          Cancel
        </button>
        <button
          onClick={successModal}
          style={modalStyles.saveBtn}
          onMouseEnter={() => setSaveButtonHovered(true)}
          onMouseLeave={() => setSaveButtonHovered(false)}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DialogWindow;
