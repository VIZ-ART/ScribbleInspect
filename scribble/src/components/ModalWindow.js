import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Confetti from "react-confetti";
import ProgressWheel from "./ProgressWheel";
Modal.setAppElement("#root");

const ModalWindow = ({ isModalOpen, closeModal, value, maxValue }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#fff",
      padding: "20px",
      maxWidth: "600px",
      width: "100%",
      maxHeight: "90vh",
      overflow: "hidden",
      borderRadius: "4px",
      outline: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      alignSelf: "center",
    },
    btn: {
      alignSelf: "center",
      width: "fit-content",
    },
  };

  const confettiProps = {
    width: window.innerWidth,
    height: window.innerHeight,
    numberOfPieces: "500",
  };

  useEffect(() => {
    const percentage = Math.floor((value / maxValue) * 100);
    if (percentage === 100) {
      setShowConfetti(true);
    }
  }, [value, maxValue]);

  const getProgressText = () => {
    const percentage = Math.floor((value / maxValue) * 100);
    if (percentage === 100) return "❤️‍🔥 You're the best!";
    else if (percentage > 80) return "🔥 Wow, such talent!";
    else if (percentage > 60) return "👍 Impressive, I guess...";
    else if (percentage > 40) return "🙂 Not bad, for a human.";
    else return "💪 Keep trying, maybe you'll get there!";
  };

  console.log("modal rendered");
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => closeModal()}
      style={modalStyles}
    >
      {showConfetti && <Confetti {...confettiProps} />}
      <h2 style={modalStyles.title}>Result</h2>
      <ProgressWheel
        value={value}
        maxValue={maxValue}
        style={modalStyles.wheel}
      />
      <p>{getProgressText()}</p>
      <button
        className="btn close-btn"
        onClick={() => closeModal()}
        style={modalStyles.btn}
      >
        Close
      </button>
    </Modal>
  );
};

export default ModalWindow;
