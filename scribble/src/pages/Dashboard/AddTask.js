import React from "react";
import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  handleChange,
  clearValues,
  uploadFile,
} from "../../features/task/taskSlice";

const AddTask = () => {
  const {
    isLoading,
    taskName,
    teacherName,
    subjectName,
    endDate,
    endTime,
    difficultyOptions,
    difficulty,
    statusOptions,
    status,
    task,
    answerKey,
    isEditing,
    editTaskId,
  } = useSelector((store) => store.task);
  // const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !subjectName || !endDate || !endTime) {
      toast.error("please fill out all the fields");
      return;
    }
  };

  const handleTaskInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const handleFileInput = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    dispatch(uploadFile({ name, file }));
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit task" : "add task"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="taskName"
            labeltext="task name"
            value={taskName}
            handleChange={handleTaskInput}
          />

          <FormRow
            type="text"
            name="subjectName"
            labeltext="subject name"
            value={subjectName}
            handleChange={handleTaskInput}
          />

          <FormRowSelect
            name="difficulty"
            value={difficulty}
            options={difficultyOptions}
            labeltext="difficulty level"
            handleChange={handleTaskInput}
          />

          <FormRow
            type="file"
            name="task"
            // value={task}
            handleChange={handleFileInput}
            disabled={isLoading}
          />

          <FormRow
            type="date"
            name="endDate"
            labeltext="end date"
            value={endDate}
            handleChange={handleTaskInput}
          />

          <FormRow
            type="time"
            name="endTime"
            labeltext="end time"
            value={endTime}
            handleChange={handleTaskInput}
          />

          <FormRow
            type="file"
            name="answerKey"
            labeltext="answer key"
            handleChange={handleFileInput}
            disabled={isLoading}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => {
                console.log("Clear clicks");
                dispatch(clearValues());
              }}
            >
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddTask;
