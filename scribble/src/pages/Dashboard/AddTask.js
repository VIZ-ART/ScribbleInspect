import React from "react";
import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { handleChange } from "../../features/task/taskSlice";

const AddTask = () => {
  const {
    isLoading,
    taskName,
    teacherName,
    subjectName,
    deadline,
    difficultyOptions,
    difficulty,
    statusOptions,
    status,
    task,
    isEditing,
    editTaskId,
  } = useSelector((store) => store.task);
  // const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !subjectName || !deadline) {
      toast.error("please fill out all the fields");
      return;
    }
  };

  const handleTaskInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("addd task ", name, value);
    dispatch(handleChange({ name, value }));
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit task" : "add task"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="taskname"
            labelText="task name"
            value={taskName}
            handleChange={handleTaskInput}
          />

          {/* <FormRow
            type="text"
            name="teacherName"
            labelText="teacher name"
            value={teacherName}
            handleChange={handleTaskInput}
            disabled={true}
          /> */}

          <FormRow
            type="text"
            name="subjectName"
            labelText="subject name"
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
            value={subjectName}
            handleChange={handleTaskInput}
          />

          <FormRow
            type="date"
            name="endDate"
            labeltext="end date"
            value={subjectName}
            handleChange={handleTaskInput}
          />

          <FormRow
            type="time"
            name="endTime"
            labeltext="end time"
            value={subjectName}
            handleChange={handleTaskInput}
          />

          <FormRow
            type="file"
            name="key"
            labeltext="answer key"
            value={subjectName}
            handleChange={handleTaskInput}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => {
                console.log("Clear button clicked");
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
