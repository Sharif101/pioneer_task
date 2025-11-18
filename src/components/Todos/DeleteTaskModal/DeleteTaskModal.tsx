"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { AlertTriangle } from "lucide-react";

interface DeleteTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todoId: number | null;
  onTodoDeleted: () => void;
}

export default function DeleteTaskModal({
  open,
  onOpenChange,
  todoId,
  onTodoDeleted,
}: DeleteTaskModalProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { token } = useAuth();

  const handleDelete = async () => {
    if (!todoId) return;

    try {
      const response = await fetch(`${API_URL}/api/todos/${todoId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      toast.success("Todo deleted successfully!");
      onTodoDeleted();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Error deleting todo");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-0 rounded-xl overflow-hidden">
        <DialogHeader className="px-6 py-5 border-b">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-7 h-7 text-red-500" />
            <DialogTitle className="text-lg font-semibold">
              Delete Confirmation
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="px-6 py-4 space-y-4 text-center">
          <p className="text-gray-700 text-base">
            Are you sure you want to delete this task?
          </p>
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-end gap-3">
          <button
            onClick={() => onOpenChange(false)}
            className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-6 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
