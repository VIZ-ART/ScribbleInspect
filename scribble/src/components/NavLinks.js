import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

const NavLinks = ({ toggleSidebar }) => {
  const { isTeacher } = useSelector((store) => store.user);
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon, forTeacher, forStudent } = link;

        if ((forTeacher && !isTeacher) || (forStudent && isTeacher))
          return null;

        return (
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            key={id}
            onClick={toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
