"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import { formatDueDate } from "@/utils/formatDate";

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
}: TodoCardProps) {
  const priorityInfo = priorityConfig[priority];

  return (
    <Card
      className={`w-full max-w-md hover:shadow-md transition-shadow bg-white rounded-2xl`}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[18px] font-500 text-[#4B5563] flex-1 leading-snug capitalize">
            {title}
          </h3>
          <div className="flex items-center gap-1">
            <Badge
              className={`${priorityInfo.className} font-medium text-xs px-3 py-1 rounded`}
            >
              {priorityInfo.label}
            </Badge>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <GripVertical className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-[14px] text-[#4B5563] leading-relaxed capitalize">
          {description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-gray-500">
            Due {formatDueDate(dueDate)}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="p-2 hover:bg-blue-50 rounded transition-colors bg-[#EEF7FF] cursor-pointer"
              aria-label="Edit task"
            >
              <Pencil className="w-4 h-4 text-blue-500" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 hover:bg-red-50 rounded transition-colors bg-[#EEF7FF] cursor-pointer"
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
