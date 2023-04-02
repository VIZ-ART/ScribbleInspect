import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  {
    id: 1,
    text: "stats",
    path: "/",
    icon: <IoBarChartSharp />,
    restricted: false,
  },
  {
    id: 2,
    text: "view tasks",
    path: "/view-tasks",
    icon: <MdQueryStats />,
    restricted: false,
  },
  {
    id: 3,
    text: "add task",
    path: "/add-task",
    icon: <FaWpforms />,
    restricted: true,
  },
  {
    id: 4,
    text: "profile",
    path: "/profile",
    icon: <ImProfile />,
    restricted: false,
  },
];

export default links;
