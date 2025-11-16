"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, GripVertical } from "lucide-react";

type Priority = "extreme" | "moderate" | "low";

interface Assignee {
  id: string;
  name: string;
  initials: string;
  color: string;
}

interface TodoCardProps {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  assignees?: Assignee[];
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  extreme: {
    label: "Extreme",
    className: "bg-red-100 text-red-700 hover:bg-red-100",
  },
  moderate: {
    label: "Moderate",
    className: "bg-green-100 text-green-700 hover:bg-green-100",
  },
  low: {
    label: "Low",
    className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  },
};

export default function TodoCard({
  title,
  description,
  dueDate,
  priority,
  assignees = [],
  onEdit,
  onDelete,
  className = "",
}: TodoCardProps) {
  const priorityInfo = priorityConfig[priority];

  return (
    <Card
      className={`w-full hover:shadow-md transition-shadow bg-white ${className}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-gray-900 flex-1">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <Badge className={`${priorityInfo.className} font-medium text-xs`}>
              {priorityInfo.label}
            </Badge>
            <button className="p-0.5 hover:bg-gray-100 rounded transition-colors">
              <GripVertical className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-sm text-gray-500">Due {dueDate}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={onEdit}
              className="p-1.5 hover:bg-blue-50 rounded transition-colors"
              aria-label="Edit task"
            >
              <Pencil className="w-4 h-4 text-blue-500" />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 hover:bg-red-50 rounded transition-colors"
              aria-label="Delete task"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
