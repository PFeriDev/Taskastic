"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { NotebookPen } from "lucide-react";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoFormProps {
  refreshTodos: () => Promise<void>;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

// Form Component
const AddTodoForm = ({ refreshTodos }: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) throw new Error("Failed to add todo");
      await refreshTodos();
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <Button type="submit" onClick={refreshTodos} variant="secondary">
        Add Todo
      </Button>
    </form>
  );
};

// List Component
const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Todos</h1>
      <ul className="space-y-3 mt-4">
        {todos.map((todo) => (
          <li key={todo.id} className="border border-[#383838]/50 p-5 rounded">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-semibold">{todo.title}</span>
                <p className="text-sm text-gray-600 mb-2">{todo.description}</p>
                <p className="flex gap-2">
                  <NotebookPen size={20} /> Not completed
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => onDelete(todo.id)}>
                  DONE!
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Container Component
export const TodoContainer = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
      const data = await response.json();
      setTodos(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleToggleCompleted = async (id: number, currentCompleted: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentCompleted }),
      });
      if (!response.ok) throw new Error("Failed to update todo");
      await fetchTodos();
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete todo");
      await fetchTodos();
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="lg:col-span-6 border border-[#383838]/50 rounded-lg p-3">
        <TodoList todos={todos} onToggle={handleToggleCompleted} onDelete={handleDeleteTodo} />
      </div>
      <div className="lg:col-span-3 border border-[#383838]/50 rounded-lg p-3">
        <AddTodoForm refreshTodos={fetchTodos} />
      </div>
    </>
  );
};

export default TodoContainer;
export { AddTodoForm, TodoList };
