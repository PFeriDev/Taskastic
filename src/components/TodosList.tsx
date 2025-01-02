"use client";

import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TodosList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lista lekérdezése
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

  useEffect(() => {
    fetchTodos(); // Kezdeti lista betöltése
  }, []);

  // Todo hozzáadása
  const handleAddTodo = async (newTodo: Todo) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      // Lista frissítése a hozzáadás után
      fetchTodos();
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  // Todo frissítése (completed)
  const handleToggleCompleted = async (id: number, currentCompleted: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentCompleted }), // Az új státuszt küldjük
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      // Lista frissítése a frissítés után
      fetchTodos();
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  // Todo törlése
  const handleDeleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      // Lista frissítése a törlés után
      fetchTodos();
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Todos</h1>
      <ul className="list-disc pl-5 space-y-4">
        {todos.map((todo) => (
          <li key={todo.id} className="space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-semibold">{todo.title}</span>
                <p className="text-sm text-gray-600">{todo.description}</p>
                <p>{todo.completed ? "✅ Completed" : "❌ Not completed"}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleCompleted(todo.id, todo.completed)}
                  className="text-sm bg-blue-500 text-white px-2 py-1 rounded">
                  {todo.completed ? "Mark as Incomplete" : "Mark as Completed"}
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-sm bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosList;
