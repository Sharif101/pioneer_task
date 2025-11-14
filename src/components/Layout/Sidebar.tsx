"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoCheckmarkDone, IoPersonCircle } from "react-icons/io5";
import { LogOut, Home, CheckSquare, User } from "lucide-react";

const menuItems = [
  {
    id: 1,
    label: "Dashboard",
    href: "#",
    icon: Home,
  },
  {
    id: 1,
    label: "Todos",
    href: "/dashboard/todos",
    icon: IoCheckmarkDone,
  },
  {
    id: 4,
    label: "Account Information",
    href: "#",
    icon: IoPersonCircle,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 bg-gradient-to-b from-blue-900 to-blue-950 text-white flex flex-col">
      {/* Profile Section */}
      <div className="p-6 text-center border-b border-blue-800">
        <div className="w-24 h-24 mx-auto mb-3 rounded-lg border-4 border-pink-500 overflow-hidden bg-gray-300">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-lg">amanuael</h3>
        <p className="text-sm text-blue-300">amanuael@gmail.com</p>
      </div>

      {/* Navigation Menu (MAP SYSTEM) */}
      <nav className="flex-1 py-6 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center px-6 py-3 transition-colors ${
                isActive
                  ? "bg-blue-800 text-white"
                  : "text-blue-200 hover:bg-blue-800"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-6 border-t border-blue-800">
        <button className="flex items-center w-full px-6 py-3 hover:bg-blue-800 transition-colors rounded-lg">
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
