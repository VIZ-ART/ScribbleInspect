import React, { useState, useEffect, useRef } from "react";
import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createTask, uploadFile } from "../../features/task/taskSlice";
import { getObjectFromLocalStorage } from "../../utils/localStorage";

const initialState = {
  taskName: "",
  teacherName: getObjectFromLocalStorage("user")?.name,
  subjectName: "",
  endDate: "",
  endTime: "",
  difficultyOptions: ["Easy", "Medium", "Hard"],
  difficulty: "Easy",
  task: null,
  answerKey: null,
  isEditing: false,
  editTaskId: "",
};

const AddTask = () => {
  const [values, setValues] = useState(initialState);
  const { fileLink, isLoading } = useSelector((store) => store.task);
  const taskRef = React.createRef();
  const answerKeyRef = React.createRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (
      !values.taskName ||
      !values.subjectName ||
      !values.endDate ||
      !values.endTime
    ) {
      toast.error("please fill out all the fields");
      return;
    }
    if (!values.task || !values.answerKey) {
      toast.error("please upload all the files");
      return;
    }
    dispatch(createTask(values));
  };

  const handleClear = () => {
    setValues(initialState);
    taskRef.current.value = null;
    answerKeyRef.current.value = null;
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
    dispatch(
      uploadFile({
        name,
        file,
        callback: (fileLink) => {
          console.log("file link in add task ", fileLink);
          setValues({ ...values, [name]: fileLink });
        },
      })
    );
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
            ref={taskRef}
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
            ref={answerKeyRef}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddTask;
