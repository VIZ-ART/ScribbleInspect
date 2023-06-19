import React, { useState } from "react";
import Modal from "react-modal";
import { FormRow } from ".";
import { toast } from "react-toastify";

const ChangeScoreWindow = ({
  isModalOpen,
  closeModal,
  successModal,
  prevScore,
  maxScore,
}) => {
  const [isCancelButtonHovered, setCancelButtonHovered] = useState(false);
  const [isSaveButtonHovered, setSaveButtonHovered] = useState(false);
  const [score, setScore] = useState(prevScore);
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
      maxHeight: "200px",
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

  const handleScoreChange = (e) => {
    setScore(e.target.value);
  };

  const handleConfirm = () => {
    console.log(score, "just before confirmation");
    if (score > maxScore)
      toast.warning("New score shall not exceed " + maxScore + "!");
    else successModal(score);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      ariaHideApp={false}
    >
      <h5>Change Score</h5>
      <FormRow value={score} handleChange={handleScoreChange} />
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
          onClick={handleConfirm}
          style={modalStyles.saveBtn}
          onMouseEnter={() => setSaveButtonHovered(true)}
          onMouseLeave={() => setSaveButtonHovered(false)}
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default ChangeScoreWindow;
