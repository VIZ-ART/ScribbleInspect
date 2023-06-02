import StatItem from "./StatItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import { useSelector } from "react-redux";

const StatsContainer = ({ isTeacher }) => {
  const {
    pendingTasks,
    submittedTasks,
    gradedTasks,
    ongoingTasks,
    completedTasks,
  } = useSelector((store) => store.stats);

  const studentStats = [
    {
      title: "pending tasks",
      count: pendingTasks || 0,
      icon: <FaCalendarCheck />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "submitted tasks",
      count: submittedTasks || 0,
      icon: <FaSuitcaseRolling />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "graded tasks",
      count: gradedTasks || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  const teacherStats = [
    {
      title: "ongoing tasks",
      count: ongoingTasks || 0,
      icon: <FaCalendarCheck />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "completed tasks",
      count: completedTasks || 0,
      icon: <FaSuitcaseRolling />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "graded tasks",
      count: gradedTasks || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {isTeacher
        ? teacherStats.map((item, index) => {
            return <StatItem key={index} {...item} />;
          })
        : studentStats.map((item, index) => {
            return <StatItem key={index} {...item} />;
          })}
    </Wrapper>
  );
};

export default StatsContainer;
