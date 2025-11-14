"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoCheckmarkDone, IoPersonCircle } from "react-icons/io5";
import { LogOut, Home } from "lucide-react";
import profilePic from "../../asstes/Ellipse 1.png";
import Image from "next/image";

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
    href: "/dashboard/acountinfo",
    icon: IoPersonCircle,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 bg-gradient-to-b from-blue-900 to-blue-950 text-white flex flex-col">
      {/* Profile Section */}
      <div className="p-6 text-center border-b border-blue-800">
        <div className="w-24 h-24 mx-auto mb-3 rounded-full border-2 border-white-500 overflow-hidden relative">
          <Image
            src={profilePic}
            alt="Profile"
            width={96} // 24 * 4 = 96px
            height={96}
            className="object-cover rounded-full"
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
