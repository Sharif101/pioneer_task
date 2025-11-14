"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { svgs } from "@/utils/findSvgs/findSvgs";

export function Sidebar() {
  const pathname = usePathname();

  const sidebarItems = [
    {
      id: 1,
      path: "/dashboard/todos",
      icon: svgs.dashboard,
      text: "Todos",
    },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r shadow-sm">
      <nav className="flex flex-col p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.id}
              href={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded transition-colors ${
                isActive
                  ? "bg-[#fce9ec] text-[#db4444]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.text}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
