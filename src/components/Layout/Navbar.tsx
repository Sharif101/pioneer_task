"use client";

import { Bell, Calendar } from "lucide-react";

export function Navbar() {
  return (
    <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      {/* Logo */}
      <div className="flex items-center">
        <div>
          <div className="font-bold text-gray-800">DREAMY</div>
          <div className="text-xs text-gray-600">SOFTWARE</div>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
          <Bell className="w-5 h-5 text-white" />
        </button>
        <button className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
          <Calendar className="w-5 h-5 text-white" />
        </button>
        <div className="ml-3 text-right">
          <div className="font-semibold text-gray-800">Friday</div>
          <div className="text-sm text-gray-600">07/11/2025</div>
        </div>
      </div>
    </div>
  );
}
