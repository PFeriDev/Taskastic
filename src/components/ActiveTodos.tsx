"use client";

import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const ActiveTodosList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        setTodos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Szűrjük az aktív todo-kat (completed: false)
  const activeTodos = todos.filter((todo) => !todo.completed);
  const handleAddTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Active Todos</h1>
      <ul className="list-disc pl-5 space-y-4">
        {activeTodos.length > 0 ? (
          activeTodos.map((todo) => (
            <li key={todo.id} className="space-y-1">
              <span className="text-lg font-semibold">{todo.title}</span>
              <p className="text-sm text-white">{todo.description}</p>
            </li>
          ))
        ) : (
          <p>No active todos</p>
        )}
      </ul>
    </div>
  );
};

export default ActiveTodosList;
