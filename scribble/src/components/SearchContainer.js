import React from "react";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchSubject, sort, sortOptions } =
    useSelector((store) => store.viewTasks);
  const { studentStatusOptions, teacherStatusOption, subjectOptions } =
    useSelector((store) => store.task);

  return <h1>SearchContainer</h1>;
};

export default SearchContainer;
