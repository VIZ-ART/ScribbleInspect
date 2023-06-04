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

const TasksContainer = () => {
  const { tasks, isLoading, totalTasks, numOfPages } = useSelector(
    (store) => store.viewTasks
  );

  const { isTeacher } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);

  const handleOpenModal = (task) => {
    setSelectedTask(task);
  };
  const handleCloseModal = () => {
    setSelectedTask(null);
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
          return <Task key={task.id} {...task} openModal={handleOpenModal} />;
        })}
        {selectedTask && (
          <ModalWindow
            isModalOpen
            value={selectedTask.result}
            maxValue={selectedTask.maxMarks}
            closeModal={handleCloseModal}
          />
        )}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default TasksContainer;
