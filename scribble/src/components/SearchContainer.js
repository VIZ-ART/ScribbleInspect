import React, { useCallback } from "react";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChange,
  clearFilters,
  getAllTasks,
  getTeacherTasks,
  changePage,
} from "../features/viewTasks/viewTasksSlice";

const SearchContainer = () => {
  const { isTeacher } = useSelector((store) => store.user);
  const { isLoading, searchStatus, searchSubject, sort, sortOptions } =
    useSelector((store) => store.viewTasks);
  const { studentStatusOptions, teacherStatusOptions, subjectOptions } =
    useSelector((store) => store.task);
  const dispatch = useDispatch();
  const [localSearch, setLocalSearch] = useState("");

  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
    dispatch(changePage(1));
    dispatch(isTeacher ? getTeacherTasks() : getAllTasks());
  };

  const debounce = useCallback(() => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
        dispatch(isTeacher ? getTeacherTasks() : getAllTasks());
      }, 1000);
    };
  }, [dispatch, isTeacher, setLocalSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch("");
    dispatch(clearFilters());
    dispatch(changePage(1));
    dispatch(isTeacher ? getTeacherTasks() : getAllTasks());
  };

  const optimizedDebounce = debounce();

  return (
    <Wrapper>
      <form className="form">
        <h4>Filter tasks</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />

          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            options={
              isTeacher
                ? ["all", ...teacherStatusOptions]
                : ["all", ...studentStatusOptions]
            }
          />

          <FormRowSelect
            labelText="subject"
            name="searchSubject"
            value={searchSubject}
            handleChange={handleSearch}
            options={["all", ...subjectOptions]}
          />

          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            options={sortOptions}
          />

          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
