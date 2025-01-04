import React from "react";
import TodosList from "./TodosList";
import CompletedTodos from "./CompletedTodos";

const CenterSection = () => {
  return (
    <>
      <TodosList />
      <CompletedTodos />
    </>
  );
};

export default CenterSection;
