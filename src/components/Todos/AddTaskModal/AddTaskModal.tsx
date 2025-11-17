"use client";

import { Calendar, Trash2 } from "lucide-react";
import React, { useState } from "react";
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

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTodoCreated: () => void;
}

export default function AddTaskModal({
  open,
  onOpenChange,
  onTodoCreated,
}: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    priority: "",
    description: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { token } = useAuth();

  const handleSubmit = async () => {
    if (!formData.title || !formData.date || !formData.priority) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/todos/`, {
        method: "POST",
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

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      const data = await response.json();
      toast.success("Todo created successfully!");
      console.log("Created Todo:", data);

      onTodoCreated();
      setFormData({ title: "", date: "", priority: "", description: "" });
    } catch (error) {
      console.error(error);
      toast.error("Error creating todo");
    }
  };

  const handleDelete = () => {
    setFormData({
      title: "",
      date: "",
      priority: "",
      description: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Add New Task
            </DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 underline"
            >
              Go Back
            </button>
          </div>
        </DialogHeader>

        <div className="px-6 py-6 space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter task title"
            />
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <Label>Priority</Label>
            <div className="flex gap-6 mt-1">
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
                    className={`w-4 h-4 border-gray-300 focus:ring-2 ${
                      p === "extreme"
                        ? "text-red-600 focus:ring-red-500"
                        : p === "moderate"
                        ? "text-teal-600 focus:ring-teal-500"
                        : "text-yellow-600 focus:ring-yellow-500"
                    }`}
                  />
                  <span className="ml-2 text-sm text-gray-700 flex items-center gap-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        p === "extreme"
                          ? "bg-red-500"
                          : p === "moderate"
                          ? "bg-teal-500"
                          : "bg-yellow-500"
                      }`}
                    ></span>
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
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Start writing here..."
              rows={6}
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-between">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
          >
            Done
          </button>
          <button
            onClick={handleDelete}
            className="w-10 h-10 bg-pink-500 hover:bg-pink-600 text-white rounded-lg flex items-center justify-center transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
