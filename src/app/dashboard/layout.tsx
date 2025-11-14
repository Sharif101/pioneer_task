import { Sidebar } from "@/components/Layout/Sidebar";
import { Navbar } from "@/components/Layout/Navbar";
import { ReactNode } from "react";
import Searchbar from "@/components/Layout/Searchbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      <Navbar />
      <Searchbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
