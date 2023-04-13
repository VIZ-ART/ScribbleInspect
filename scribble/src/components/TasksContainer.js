import React from "react";
import { useEffect } from "react";
import Task from "./Task";
import Wrapper from "../assets/wrappers/TasksContainer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";

const TasksContainer = () => {
  const { tasks, isLoading } = useSelector((store) => store.viewTasks);
  const dispatch = useDispatch();

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
          console.log("Task ", task);
          return <Task key={task._id} {...task} />;
        })}
      </div>
    </Wrapper>
  );
};

export default TasksContainer;
