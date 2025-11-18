"use client";

import Todos from "@/components/Todos/Todos";
import { useAuth } from "@/context/AuthContext";
import { Todo } from "@/utils/types/todo";
import React, { useEffect, useState } from "react";

interface PaginatedTodos {
  count: number;
  next: string | null;
  previous: string | null;
  results: Todo[];
}

export default function Page() {
  const { token } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTodos, setRefreshTodos] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchTodos = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/todos/?search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch todos");

        const data: PaginatedTodos = await res.json();
        setTodos(data.results);
        console.log({ data });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [token, refreshTodos, search]);

  if (loading) return <p>Loading todos...</p>;

  return (
    <Todos
      todos={todos}
      onTodoCreated={() => setRefreshTodos((prev) => !prev)}
      search={search}
      setSearch={setSearch} // pass search state and updater
    />
  );
}
