import React from "react";
import { FaBookOpen, FaCalendarCheck } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Task";
import TaskInfo from "./TaskInfo";

const Task = ({
  id,
  taskName,
  teacherName,
  subjectName,
  maxMarks,
  endDate,
  endTime,
  task,
}) => {
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

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{iconLetters.substring(0, 4)}</div>
        <div className="info">
          <h5>{taskName}</h5>
          <p>{teacherName}</p>
        </div>
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
          <div className={`status pending`}>pending</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-task"
              className="btn edit-btn"
              onClick={() => console.log("Edit Task")}
            >
              Edit
            </Link>
            <button
              type="bu tton"
              className="btn delete-btn"
              onClick={() => console.log("Delete Task")}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Task;
