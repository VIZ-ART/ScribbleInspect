import React, { useState } from "react";
import { useEffect } from "react";
import Task from "./Task";
import Wrapper from "../assets/wrappers/TasksContainer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import {
  getAllTasks,
  getTeacherTasks,
} from "../features/viewTasks/viewTasksSlice";
import PageBtnContainer from "./PageBtnContainer";
import ModalWindow from "./ModalWindow";
import DialogWindow from "./DialogWindow";
import { deleteTask } from "../features/task/taskSlice";

const initialState = {
  selectedTask: null,
  isModalOpen: false,
  isDialogOpen: false,
  dialogText: "",
  type: null,
};

const TasksContainer = () => {
  const { tasks, isLoading, totalTasks, numOfPages } = useSelector(
    (store) => store.viewTasks
  );

  const { isTeacher } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [values, setValues] = useState(initialState);

  const handleOpenModal = (task) => {
    setValues({ ...values, selectedTask: task, isModalOpen: true });
  };

  const handleCloseModal = () => {
    setValues({ ...values, selectedTask: null, isModalOpen: false });
  };

  const handleOpenDialog = (id, type, text) => {
    console.log("dialog opened");
    setValues({
      ...values,
      selectedTask: { id: id },
      type: type,
      dialogText: text,
      isDialogOpen: true,
    });
  };

  const handleCloseDialog = () => {
    console.log("dialog closed");
    setValues({
      ...values,
      selectedTaskId: null,
      type: null,
      dialogText: "",
      isDialogOpen: false,
    });
  };

  const handleSuccessDialog = () => {
    console.log("inside handlesuccessdialog taskcontainer.js");
    if (values.type === "task") dispatch(deleteTask(values.selectedTask.id));
    else if (values.type === "submission") console.log("submission deleted"); //TODO
    handleCloseDialog();
  };

  useEffect(() => {
    isTeacher ? dispatch(getTeacherTasks()) : dispatch(getAllTasks());
  }, [isTeacher, dispatch]);

  if (isLoading) return <Loading center />;

  if (tasks.length === 0)
    return (
      <Wrapper>
        <h2>No tasks to display...</h2>
      </Wrapper>
    );

  return (
    <Wrapper>
      <h5>
        {totalTasks} task{tasks.length > 1 && "s"} found
      </h5>
      <div className="tasks">
        {tasks.map((task) => {
          return (
            <Task
              key={task.id}
              {...task}
              openModal={handleOpenModal}
              openDialog={handleOpenDialog}
            />
          );
        })}
        {values.isModalOpen && (
          <ModalWindow
            isModalOpen={values.isModalOpen}
            value={values.selectedTask.result}
            maxValue={values.selectedTask.maxMarks}
            closeModal={handleCloseModal}
          />
        )}
        {values.isDialogOpen && (
          <DialogWindow
            isModalOpen={values.isDialogOpen}
            closeModal={handleCloseDialog}
            successModal={handleSuccessDialog}
            modalText={values.dialogText}
          />
        )}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default TasksContainer;
