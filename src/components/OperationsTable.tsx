"use client";

import { useState } from "react";
import { Download } from "lucide-react";

interface Operation {
  account: string;
  operation: string;
  operationLink: string;
  transaction: string;
  type: string;
  time: string;
}

interface OperationsTableProps {
  data: Operation[];
  itemsPerPage?: number;
  title?: string;
}

export default function OperationsTable({
  data,
  itemsPerPage = 10,
  title = "Operations",
}: OperationsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const pageNumbers: (string | number)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageNumbers.push(i);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pageNumbers.push("ellipsis");
    }
  }

  // Filter out consecutive ellipsis
  const filteredPageNumbers = pageNumbers.filter(
    (number, index) =>
      number !== "ellipsis" || pageNumbers[index - 1] !== "ellipsis"
  );

  return (
    <div className="bg-black/90 text-white rounded-lg p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <button className="flex items-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 px-3 py-1.5 rounded-md text-sm transition-colors">
          <Download size={16} />
          Export Data as CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-2 font-medium">Account</th>
              <th className="text-left py-4 px-2 font-medium">Operation</th>
              <th className="text-left py-4 px-2 font-medium">Transaction</th>
              <th className="text-left py-4 px-2 font-medium">Type</th>
              <th className="text-left py-4 px-2 font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((operation, index) => (
              <tr key={index} className="border-b border-gray-800/50">
                <td className="py-4 px-2">
                  <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-md">
                    {operation.account}
                  </span>
                </td>
                <td className="py-4 px-2">
                  {operation.operation} to{" "}
                  <a
                    href={operation.operationLink}
                    className="text-orange-500 underline underline-offset-2"
                  >
                    {operation.operationLink.substring(0, 10)}...
                  </a>
                </td>
                <td className="py-4 px-2 text-gray-400">
                  {operation.transaction.substring(0, 12)}...
                </td>
                <td className="py-4 px-2">{operation.type}</td>
                <td className="py-4 px-2">{operation.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-1">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
        >
          Prev
        </button>

        {filteredPageNumbers.map((number, index) =>
          number === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="px-3 py-1">
              ...
            </span>
          ) : (
            <button
              key={`page-${number}`}
              onClick={() => setCurrentPage(number as number)}
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                currentPage === number
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              {number}
            </button>
          )
        )}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}
