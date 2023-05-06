import FormRow from "../../components/FormRow";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { uploadFile } from "../../features/submission/submissionSlice";

const SubmitTask = () => {
  const [submission, setSubmission] = useState("");
  const { isLoading, taskName, teacherName, subjectName } = useSelector(
    (store) => store.submission
  );
  const dispatch = useDispatch();
  const submissionRef = React.createRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submission) toast.error("please upload the file");
  };

  const handleClear = () => {
    submissionRef.current.value = null;
    setSubmission("");
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    dispatch(
      uploadFile({
        file,
        callback: (fileLink) => {
          setSubmission(fileLink);
        },
      })
    );
  };

  return (
    <Wrapper>
      <div className="form">
        <h3>Submit task</h3>
        <div className="form-center">
          <FormRow
            type="name"
            name="taskName"
            value={taskName}
            labeltext="task name"
            disabled={true}
          />
          <FormRow
            type="text"
            name="teacherName"
            value={teacherName}
            labeltext="teacher name"
            disabled={true}
          />
          <FormRow
            type="text"
            name="subjectName"
            value={subjectName}
            labeltext="subject name"
            disabled={true}
          />
          <FormRow
            type="file"
            name="submission"
            handleChange={handleFileInput}
            disabled={isLoading}
            ref={submissionRef}
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
              Submit
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SubmitTask;
