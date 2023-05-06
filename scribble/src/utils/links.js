import { IoBarChartSharp } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaWpforms } from "react-icons/fa";
import { HiOutlineNewspaper } from "react-icons/hi";
import { RiAttachment2 } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const links = [
  {
    id: 1,
    text: "stats",
    path: "/",
    icon: <IoBarChartSharp />,
    forTeacher: false,
    forStudent: false,
  },
  {
    id: 2,
    text: "view tasks",
    path: "/view-tasks",
    icon: <HiMagnifyingGlass />,
    forTeacher: false,
    forStudent: false,
  },
  {
    id: 3,
    text: "add task",
    path: "/add-task",
    icon: <FaWpforms />,
    forTeacher: true,
    forStudent: false,
  },
  {
    id: 4,
    text: "submit task",
    path: "/submit-task",
    icon: <RiAttachment2 />,
    forTeacher: false,
    forStudent: true,
  },
  {
    id: 5,
    text: "results",
    path: "/results",
    icon: <HiOutlineNewspaper />,
    forTeacher: false,
    forStudent: false,
  },
  {
    id: 6,
    text: "profile",
    path: "/profile",
    icon: <CgProfile />,
    forTeacher: false,
    forStudent: false,
  },
];

export default links;
