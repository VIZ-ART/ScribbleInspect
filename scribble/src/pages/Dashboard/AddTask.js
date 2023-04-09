import React, { useState } from "react";
import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createTask, uploadFile } from "../../features/task/taskSlice";
import { getObjectFromLocalStorage } from "../../utils/localStorage";

const today = new Date();
const year = today.getFullYear().toString();
const month = (today.getMonth() + 1).toString().padStart(2, 0);
const date = today.getDate().toString().padStart(2, 0);

const initialState = {
  taskName: "",
  teacherName: getObjectFromLocalStorage("user")?.userName,
  subjectName: "",
  endDate: `${year}-${month}-${date}`,
  endTime: "00:00",
  difficultyOptions: ["Easy", "Medium", "Hard"],
  difficulty: "Easy",
  statusOptions: ["pending", "submitted", "graded", "requested", "reviewed"],
  status: "pending",
  taskfile: null,
  answerKey: null,
  isEditing: false,
  editTaskId: "",
};

const AddTask = () => {
  const [values, setValues] = useState(initialState);
  const { task, isLoading } = useSelector((store) => store.task);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !values.taskName ||
      !values.subjectName ||
      !values.endDate ||
      !values.endTime
    ) {
      toast.error("please fill out all the fields");
      return;
    }
    dispatch(createTask(values));
  };

  const handleTaskInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}:${value}`);
    setValues({ ...values, [name]: value });
  };

  const handleFileInput = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    const link = dispatch(uploadFile({ file }));
    setValues({ ...values, [name]: link ? link : null });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{values.isEditing ? "edit task" : "add task"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="taskName"
            labeltext="task name"
            value={values.taskName}
            handleChange={handleTaskInput}
          />

          <FormRow
            type="text"
            name="subjectName"
            labeltext="subject name"
            value={values.subjectName}
            handleChange={handleTaskInput}
          />

          <FormRowSelect
            name="difficulty"
            value={values.difficulty}
            options={values.difficultyOptions}
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
            value={values.endDate}
            handleChange={handleTaskInput}
          />

          <FormRow
            type="time"
            name="endTime"
            labeltext="end time"
            value={values.endTime}
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
                setValues(initialState);
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
