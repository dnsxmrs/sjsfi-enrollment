'use client';

import React, { useState } from "react";
import { FileDown, Search } from "lucide-react";
import PDFmodal from "@/components/admin/PDFmodal";
import toast from "react-hot-toast";

const mockLogs = [
  { logNumber: "0015", timestamp: "2025-04-06 14:46:20", user: "Baron Aloveros", action: "Updated personal profile", status: "Success", role: "Admin" },
  { logNumber: "0014", timestamp: "2025-04-06 14:44:58", user: "Regina Gail Federez", action: "Deleted student record #02135", status: "Success", role: "Faculty" },
  { logNumber: "0013", timestamp: "2025-04-06 14:43:27", user: "Erice Michael Marial", action: "Attempted to access restricted page", status: "Failed", role: "Faculty" },
  { logNumber: "0012", timestamp: "2025-04-06 14:41:09", user: "Styvn Rhyz Policarpio", action: "Created new class section", status: "Success", role: "Registrar" },
  { logNumber: "0011", timestamp: "2025-04-06 14:40:12", user: "Jane Mae Santos", action: "Logged in", status: "Success", role: "Admin" },
];

export default function SystemLogsPage() {
  const [PDFmodalOpen, setPDFmodalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredLogs = mockLogs.filter((log) =>
    Object.values(log).some((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    )
  );

  const allRowIds = filteredLogs.map((log) => log.logNumber);
  const isAllSelected = allRowIds.length > 0 && allRowIds.every(id => selectedRows.includes(id));

  const handleHeaderCheckbox = () => {
    if (isAllSelected) {
      setSelectedRows([]);
      // alert(`0 logs selected`);
      toast.error(`0 logs selected`);
    } else {
      setSelectedRows(allRowIds);
      // alert(`${allRowIds.length} log(s) selected`);
      toast.success(`${allRowIds.length} log(s) selected`);
    }
  };

  const handleRowCheckbox = (logNumber: string) => {
    setSelectedRows(prev =>
      prev.includes(logNumber)
        ? prev.filter(id => id !== logNumber)
        : [...prev, logNumber]
    );
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Recent System Activities
        </h2>
      </div>

      {/* Search + Export PDF Controls */}
      <div className="mb-4">
        <div className="mb-4 relative flex items-center gap-2 md:hidden">
          <input
            type="text"
            placeholder="Search system logs..."
            className="text-gray-700  w-full md:w-1/3 pl-10 pr-4 py-2 border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute top-2.5 left-3 text-gray-700" size={18} />
          <button
            onClick={() => setPDFmodalOpen(true)}
            className="flex items-center justify-center bg-red-800 hover:bg-red-900 text-white px-3 py-2 rounded-md text-sm"
          >
            <FileDown size={18} />
            <span className="hidden md:inline ml-2">Export as PDF</span>
          </button>
        </div>

        <div className="hidden md:flex justify-between items-center">
          <div className="relative w-1/3 bg-white">
            <Search className="absolute top-2.5 left-3 text-gray-700" size={18} />
            <input
              type="text"
              placeholder="Search system logs..."
              className="text-gray-700 w-full pl-10 pr-4 py-2 border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setPDFmodalOpen(true)}
            className="flex items-center justify-center bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-md text-sm"
          >
            <FileDown size={18} />
            <span className="ml-2">Export as PDF</span>
          </button>
        </div>
      </div>

      <div className="bg-white overflow-x-auto rounded-md border border-red-700 text-gray-700">
        <table className="w-full text-left text-sm">
          <thead>
            <tr>
              <th className="px-4 py-3 border-b">Log Number</th>
              <th className="px-4 py-3 border-b">Timestamp</th>
              <th className="px-4 py-3 border-b">User</th>
              <th className="px-4 py-3 border-b">Action</th>
              <th className="px-4 py-3 border-b">Status</th>
              <th className="px-4 py-3 border-b">User Role</th>
              <th className="px-4 py-3 border-b text-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-red-600"
                  checked={isAllSelected}
                  onChange={handleHeaderCheckbox}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.logNumber} className="hover:bg-red-50">
                <td className="px-4 py-4 border-t">{log.logNumber}</td>
                <td className="px-4 py-4 border-t">{log.timestamp}</td>
                <td className="px-4 py-4 border-t">{log.user}</td>
                <td className="px-4 py-4 border-t">{log.action}</td>
                <td className="px-4 py-4 border-t">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                      log.status === "Success" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
                <td className="px-4 py-2 border-t">{log.role}</td>
                <td className="px-4 py-2 border-t text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-red-600"
                    checked={selectedRows.includes(log.logNumber)}
                    onChange={() => handleRowCheckbox(log.logNumber)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>
          ← Previous <strong className="mx-2">1</strong> 2 3 ... 67 68 Next →
        </span>
      </div> */}

      {/* PDF Modal */}
      <PDFmodal
        isOpen={PDFmodalOpen}
        onCancel={() => setPDFmodalOpen(false)}
        onConfirm={() => {
          setPDFmodalOpen(false);
          // Add router push here if needed, and import router
          // router.push('/');
        }}
      />
    </div>
  );
}
