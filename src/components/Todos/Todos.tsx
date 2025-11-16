"use client";

import { Plus, Search, Filter } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import noDataPic from "../../asstes/icon-no projects.png";
import AddTaskModal from "./AddTaskModal/AddTaskModal";
import { Todo } from "@/utils/types/todo";
import TodoCard from "@/Resources/TodoCard";

interface TodosProps {
  todos: Todo[];
}

interface Filters {
  deadlineToday: boolean;
  expires5Days: boolean;
  expires10Days: boolean;
  expires30Days: boolean;
}

export default function Todos({ todos }: TodosProps) {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    deadlineToday: false,
    expires5Days: false,
    expires10Days: false,
    expires30Days: false,
  });

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Todos</h1>
          <button
            onClick={() => setShowAddTaskModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search your task here..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 bg-white cursor-pointer"
            >
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Filter</span>
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-700">Date</p>
                </div>
                <div className="py-2">
                  {Object.entries(filters).map(([key, value]) => (
                    <label
                      key={key}
                      className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setFilters({ ...filters, [key]: e.target.checked })
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Todos List / Empty State */}
      {todos.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full h-full bg-white flex items-center justify-center rounded-xl shadow-sm p-4">
            <div className="text-center space-y-3">
              <Image
                src={noDataPic}
                alt="No Data"
                className="mx-auto"
                width={200}
                height={200}
              />
              <p className="text-xl font-medium text-gray-800">No todos yet</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              title={todo.title}
              description={todo.description}
              dueDate={todo.todo_date}
              priority={todo.priority as "extreme" | "moderate" | "low"}
            />
          ))}
        </div>
      )}

      {/* Add Task Modal */}
      <AddTaskModal
        open={showAddTaskModal}
        onOpenChange={setShowAddTaskModal}
      />
    </div>
  );
}
