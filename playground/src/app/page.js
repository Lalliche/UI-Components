"use client";
import React, { useState, useEffect } from "react";
import DataTable from "@/components/Table/DataTable";

const headers = [
  {
    id: "name",
    name: "Name",
    field: "name",
    width: "w-[33%]",
  },
  {
    id: "email",
    name: "Email",
    field: "email",
    width: "w-[33%]",
  },
  {
    id: "role",
    name: "Role",
    field: "role",
    width: "w-[33%]",
  },
];

const rowStructure = [
  {
    field: "name",
    width: "w-[33%]",
    content: (value) => <p className="text-black font-bold">{value}</p>,
  },
  {
    field: "email",
    width: "w-[33%]",
    content: (value) => <p className="text-gray-600">{value}</p>,
  },
  {
    field: "role",
    width: "w-[33%]",
    content: (value) => <p className="text-blue-500">{value}</p>,
  },
];

const onClickContent = [
  {
    condition: (data) => data.role === "Admin",
    render: (data) => <p className="text-green-600">Admin: {data.name}</p>,
  },
  {
    condition: (data) => data.role === "Admin",
    render: (data) => <p className="text-green-600">Admin Role: {data.role}</p>,
  },
  {
    condition: (data) => data.role === "User",
    render: (data) => <p className="text-blue-600">User: {data.name}</p>,
  },
  {
    condition: (data) => data.role === "User",
    render: (data) => <p className="text-blue-600">User Role: {data.role}</p>,
  },
];

const rowData = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User" },
  {
    id: 3,
    name: "Sam Johnson",
    email: "sam.johnson@example.com",
    role: "Admin",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "User",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 font-[family-name:var(--font-geist-sans)] text-gray-800">
      <header className="w-full bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="text-2xl font-bold text-blue-500">
            Component Playground
          </div>
          <nav>
            <ul className="flex gap-6 text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer transition duration-300">
                Home
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition duration-300">
                Components
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition duration-300">
                About
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 container mx-auto p-8 sm:p-16">
        <div className="bg-white shadow-lg rounded-lg p-8 sm:p-12">
          <h1 className="text-3xl font-semibold mb-6 text-gray-700">
            Welcome to My Component Playground
          </h1>
          <p className="text-gray-500 mb-4">
            This is a space where I design, build, and test my custom components
            using React and Tailwind CSS.
          </p>
          <div className="grid grid-cols-1  gap-6">
            <DataTable
              headers={headers}
              rowStructure={rowStructure}
              rowData={rowData}
              onClickContent={onClickContent}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-gray-300 p-4 text-center">
        <p>© 2024 Component Playground. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
