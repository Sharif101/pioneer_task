import React from "react";
import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="border rounded-md p-4 bg-white shadow-sm">{children}</div>
  );
}
