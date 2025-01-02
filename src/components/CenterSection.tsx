import React from "react";
import TodosList from "./TodosList";
import ActiveTodosList from "./ActiveTodos";
import CompletedTodos from "./CompletedTodos";

const CenterSection = () => {
  return (
    <>
      <TodosList />
      <ActiveTodosList />
      <CompletedTodos />
    </>
  );
};

export default CenterSection;
