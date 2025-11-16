import { Sidebar } from "@/components/Layout/Sidebar";
import { Navbar } from "@/components/Layout/Navbar";
import { ReactNode } from "react";
import Searchbar from "@/components/Layout/Searchbar";
import { User } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="h-screen w-screen flex overflow-hidden bg-gray-50">
        {/* Sidebar - Full Height */}
        <Sidebar />

        {/* Right Side: Navbar + Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50 to-gray-100">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
