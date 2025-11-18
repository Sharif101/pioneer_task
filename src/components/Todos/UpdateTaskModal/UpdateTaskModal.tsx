"use client";

import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { Todo } from "@/utils/types/todo";

interface UpdateTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo: Todo | null;
  onTodoUpdated: () => void;
}

export default function UpdateTaskModal({
  open,
  onOpenChange,
  todo,
  onTodoUpdated,
}: UpdateTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    priority: "",
    description: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { token } = useAuth();

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || "",
        date: todo.todo_date || "",
        priority: todo.priority || "",
        description: todo.description || "",
      });
    }
  }, [todo]);

  const handleUpdate = async () => {
    if (!todo) return;

    try {
      const response = await fetch(`${API_URL}/api/todos/${todo.id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: new URLSearchParams({
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          todo_date: formData.date,
        }),
      });

      if (!response.ok) throw new Error("Failed to update");

      toast.success("Todo updated successfully!");
      onTodoUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Error updating todo");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 rounded-xl overflow-hidden">
        <DialogHeader className="px-8 pt-8 pb-5 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Update Task
            </DialogTitle>

            <button
              onClick={() => onOpenChange(false)}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 underline"
            >
              Go Back
            </button>
          </div>
        </DialogHeader>

        <div className="px-8 py-3 space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="h-12"
            />
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="h-12"
            />
          </div>

          <div>
            <Label>Priority</Label>
            <div className="flex gap-8 mt-2">
              {["extreme", "moderate", "low"].map((p) => (
                <label key={p} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value={p}
                    checked={formData.priority === p}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-4 h-4"
                  />
                  <span className="ml-2 text-gray-700">
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="description">Task Description</Label>
            <Textarea
              id="description"
              rows={6}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>

        <div className="px-8 py-5 border-t flex items-center justify-between">
          <button
            onClick={handleUpdate}
            className="px-7 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Save
          </button>

          <button className="w-11 h-11 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center cursor-default">
            <Trash2 className="w-5 h-5 opacity-40" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
