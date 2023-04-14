import React from "react";
import { FaBookOpen, FaCalendarCheck } from "react-icons/fa";
import { SiLevelsdotfyi } from "react-icons/si";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Task";
import { useDispatch } from "react-redux";
import TaskInfo from "./TaskInfo";

const Task = ({
  _id,
  name,
  teacher,
  subject,
  difficulty,
  end_date,
  end_time,
  task_pdf_link,
}) => {
  const dispatch = useDispatch();

  let iconLetters = "";
  subject.split(" ").forEach((word) => {
    if (word.length > 0 && word.charAt(0) === word.charAt(0).toUpperCase())
      iconLetters += word.charAt(0);
  });

  const date = new Date(end_date);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const time = new Date(`2000-01-01T${end_time}:00`);
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const formatDateTime = (date, time) => {
    const datetime = new Date(`${date}T${time}:00`);
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
          <h5>{name}</h5>
          <p>{teacher}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <TaskInfo icon={<FaBookOpen />} text={subject} />
          <TaskInfo
            icon={<FaCalendarCheck />}
            text={formatDateTime(end_date, end_time)}
          />
          <TaskInfo icon={<SiLevelsdotfyi />} text={difficulty} />
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
