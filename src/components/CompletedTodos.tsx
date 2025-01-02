"use client";

import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  description: string; // Új mező
  completed: boolean;
}

const TodosList = () => {
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

  // Szűrjük a befejezett todo-kat
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div>
      <h1 className="text-2xl font-bold">Completed Todos</h1>
      <ul className="list-disc pl-5 space-y-4">
        {completedTodos.length > 0 ? (
          completedTodos.map((todo) => (
            <li key={todo.id} className="space-y-1">
              <span className="text-lg font-semibold">{todo.title}</span>
              <p className="text-sm text-white">{todo.description}</p>
            </li>
          ))
        ) : (
          <p>No completed todos</p>
        )}
      </ul>
    </div>
  );
};

export default TodosList;
