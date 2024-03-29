import React from "react";
import { FaBookOpen, FaCalendarCheck } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Task";
import TaskInfo from "./TaskInfo";
import { useDispatch, useSelector } from "react-redux";
import { gradeTask } from "../features/task/taskSlice";
import { setEditingMode } from "../features/task/taskSlice";
import { setSubmissionMode } from "../features/submission/submissionSlice";

const Task = ({
  id,
  taskName,
  teacherName,
  subjectName,
  maxMarks,
  endDate,
  endTime,
  task,
  submission = null,
  answerKey = null,
  status,
  score,
  submissionCount,
  openModal,
  openDialog,
  openSubmission,
}) => {
  const dispatch = useDispatch();
  const { isTeacher } = useSelector((store) => store.user);

  let iconLetters = "";
  subjectName.split(" ").forEach((word) => {
    if (word.length > 0 && word.charAt(0) === word.charAt(0).toUpperCase())
      iconLetters += word.charAt(0);
  });

  const formatDateTime = (date, time) => {
    const datetime = new Date(`${date} ${time}`);
    const formattedDate = datetime.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = datetime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${formattedDate} ${formattedTime}`;
  };

  const openFile = (fileLink) => {
    window.open(fileLink, "_blank");
  };

  const handleEdit = () => {
    dispatch(
      setEditingMode({
        id,
        taskName,
        teacherName,
        subjectName,
        maxMarks,
        endDate,
        endTime,
        task,
        answerKey,
      })
    );
  };

  const handleUpload = () => {
    dispatch(
      setSubmissionMode({
        id,
        taskName,
        teacherName,
        subjectName,
      })
    );
  };

  const handleGrade = () => {
    dispatch(
      gradeTask({
        id,
      })
    );
  };

  const handleView = () => {
    window.open(submission, "_blank");
  };

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{iconLetters.substring(0, 4)}</div>
        <div className="info">
          <h5>{taskName}</h5>
          {isTeacher ? (
            <p>{submissionCount + " responses"}</p>
          ) : (
            <p>{teacherName}</p>
          )}
        </div>

        {isTeacher && (
          <button
            className="btn subs-btn"
            onClick={() => {
              openSubmission(id, maxMarks);
            }}
          >
            <FaUsers style={{ fontSize: "24px" }} />
          </button>
        )}
      </header>
      <div className="content">
        <div className="content-center">
          <TaskInfo icon={<FaBookOpen />} text={subjectName} />
          <TaskInfo
            icon={<FaCalendarCheck />}
            text={formatDateTime(endDate, endTime)}
          />
          <TaskInfo
            icon={<IoShieldCheckmarkSharp />}
            text={`${maxMarks} marks`}
          />
          <div className={`status ${status}`}>{status}</div>
        </div>

        <footer>
          <div className="actions">
            <div className="actions-left">
              <button
                name="task"
                type="button"
                className="btn edit-btn"
                onClick={() => openFile(task)}
              >
                Task
              </button>

              {isTeacher && (
                <button
                  name="key"
                  type="button"
                  className="btn edit-btn"
                  onClick={() => openFile(answerKey)}
                >
                  Key
                </button>
              )}

              {!isTeacher && status === "pending" && (
                <Link
                  to="/submit-task"
                  className="btn edit-btn"
                  onClick={handleUpload}
                >
                  Upload
                </Link>
              )}

              {isTeacher && (
                <Link
                  to="/add-task"
                  className="btn edit-btn"
                  onClick={handleEdit}
                >
                  Edit
                </Link>
              )}

              {!isTeacher &&
                (status === "submitted" ||
                  status === "graded" ||
                  status === "requested" ||
                  status === "reviewed") && (
                  <button
                    type="button"
                    className="btn edit-btn"
                    onClick={handleView}
                  >
                    View
                  </button>
                )}
            </div>
            <div className="actions-right">
              {!isTeacher &&
                (status === "graded" ||
                  status === "requested" ||
                  status === "reviewed") && (
                  <button
                    type="button"
                    className="btn result-btn"
                    onClick={() =>
                      openModal({ id: id, result: score, maxMarks: maxMarks })
                    }
                  >
                    Result
                  </button>
                )}
              {!isTeacher && status === "graded" && (
                <button
                  type="button"
                  className="btn report-btn"
                  onClick={() => {
                    openDialog(id, "report", "Report evaluation?");
                  }}
                >
                  Report
                </button>
              )}

              {!isTeacher && status === "submitted" && (
                <button
                  type="button"
                  className="btn delete-btn"
                  onClick={() =>
                    openDialog(id, "submission", "Delete submission?")
                  }
                >
                  Delete
                </button>
              )}

              {isTeacher && status === "completed" && (
                <button
                  type="button"
                  className="btn grade-btn"
                  onClick={handleGrade}
                >
                  Grade
                </button>
              )}

              {isTeacher && (
                <button
                  type="button"
                  className="btn delete-btn"
                  onClick={() => openDialog(id, "task", "Delete Task?")}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Task;
