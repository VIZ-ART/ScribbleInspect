import React from "react";
import Wrapper from "../assets/wrappers/SubmissionItem";

const SubmissionItem = ({ title, odd, submissionContent, openModal }) => {
  const { studentName, score, status, submissionLink, studentId } =
    submissionContent;

  const handleLinkOpen = (link) => {
    window.open(link, "_blank");
  };
  return (
    <Wrapper>
      <div
        className={
          (odd ? "sub-item odd" : "sub-item") + (title ? " title" : "")
        }
      >
        <div>{studentName}</div>
        <div className={status}>{status}</div>
        <div>{score || "-"}</div>
        <button
          className="view-btn"
          style={{ visibility: title ? "hidden" : "visible" }}
          onClick={() => handleLinkOpen(submissionLink)}
          disabled={status === "pending" || status === "missed"}
        >
          View
        </button>
        <button
          style={{ visibility: title ? "hidden" : "visible" }}
          className="modify-btn"
          onClick={() => {
            openModal(studentId, score);
          }}
        >
          Modify
        </button>
      </div>
    </Wrapper>
  );
};

export default SubmissionItem;
