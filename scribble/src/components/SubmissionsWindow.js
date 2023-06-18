import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import SubmissionItem from "./SubmissionItem";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import ChangeScoreWindow from "./ChangeScoreWindow";

const initialState = {
  selectedTask: null,
  selectedStudent: null,
  isModifyOpen: false,
  score: null,
  maxScore: null,
};

const SubmissionsWindow = ({
  isModalOpen,
  closeModal,
  submissions,
  modalText,
  selectedTask,
}) => {
  const modalStyles = {
    overlay: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#fff",
      padding: "20px",
      maxWidth: "900px",
      width: "100%",
      maxHeight: "90vh",
      height: "100%",
      overflow: "hidden",
      borderRadius: "4px",
      outline: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
    },
    titleBar: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      padding: "0 20px",
    },
    title: { position: "relative" },
    closeBtn: {
      position: "absolute",
      top: "15px",
      right: "15px",
      background: "transparent",
      borderColor: "transparent",
      fontSize: "2rem",
      color: "var(--red-dark)",
      cursor: "pointer",
    },
    listContainer: {
      position: "relative",
      width: "90%",
      overflowY: "auto",
      overFlowX: "hidden",
      padding: "20px",
    },
    listTitle: {
      display: "grid",
      gridTemplateColumns: "auto repeat(4, 1fr)",
      alignItems: "center",
      padding: "10px",
      color: "black",
      borderBottom: "1px solid #ddd",
      justifyContent: "space-between",
    },
  };

  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.viewTasks);
  const [values, setValues] = useState(initialState);

  const handleOpenScore = (student, prevScore) => {
    setValues({
      ...values,
      selectedTask: selectedTask,
      selectedStudent: student,
      isModifyOpen: true,
      score: prevScore,
    });
  };

  const handleCloseScore = () => {
    setValues({
      ...values,
      selectedTask: null,
      selectedStudent: null,
      isModifyOpen: false,
      score: null,
    });
  };

  const handleModifyScore = () => {
    // dispatch(updateScore(selectedTask.id, selectedStudent.id, score))
    handleCloseScore();
  };

  if (isLoading) return <Loading center />;
  return (
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={modalStyles}>
      <div style={modalStyles.titleBar}>
        <h3 style={modalStyles.title}>{modalText}</h3>
        <button style={modalStyles.closeBtn} onClick={closeModal}>
          <FaTimes />
        </button>
      </div>

      <div style={modalStyles.listContainer}>
        <SubmissionItem
          title
          submissionContent={{
            studentName: "Student",
            status: "Status",
            score: "Score",
          }}
        />
        {submissions.map((item, index) => {
          return (
            <SubmissionItem
              key={index}
              submissionContent={item}
              odd={index % 2 !== 0}
              openModal={handleOpenScore}
            />
          );
        })}
      </div>
      {values.isModifyOpen && (
        <ChangeScoreWindow
          isModalOpen={values.isModifyOpen}
          closeModal={handleCloseScore}
          successModal={handleModifyScore}
          prevScore={values.score}
          maxScore={values.selectedTask.maxScore}
        />
      )}
    </Modal>
  );
};

export default SubmissionsWindow;
