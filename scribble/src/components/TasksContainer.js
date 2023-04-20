import React from "react";
import { useEffect } from "react";
import Task from "./Task";
import Wrapper from "../assets/wrappers/TasksContainer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { getAllTasks } from "../features/viewTasks/viewTasksSlice";

const TasksContainer = () => {
  const { tasks, isLoading } = useSelector((store) => store.viewTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  if (isLoading) return <Loading center />;

  if (tasks.length === 0)
    return (
      <Wrapper>
        <h2>No tasks to display...</h2>
      </Wrapper>
    );

  return (
    <Wrapper>
      <h5>Tasks info</h5>
      <div className="tasks">
        {tasks.map((task) => {
          return <Task key={task.id} {...task} />;
        })}
      </div>
    </Wrapper>
  );
};

export default TasksContainer;
