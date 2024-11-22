"use client"
import React, { useState } from "react";

const Table = ({ data }) => {
  const headers = [
    "Nomor",
    "Kata Kunci",
    "Total Frekuensi",
    "Kedalaman 1",
    "Kedalaman 2",
    "Kedalaman 3",
    "Kedalaman 4",
    "Total Value",
  ];

  const [sortedData, setSortedData] = useState(Object.entries(data));
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const calculateValues = ([key, values]) => {
    const totalFrequency =
      values.kedalaman1 +
      values.kedalaman2 +
      values.kedalaman3 +
      values.kedalaman4;

    const totalValue =
      values.kedalaman1 * 4 +
      values.kedalaman2 * 3 +
      values.kedalaman3 * 2 +
      values.kedalaman4 * 1;

    return { key, totalFrequency, ...values, totalValue };
  };

  const processedData = sortedData.map(calculateValues);

  const sortTable = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";

    const sorted = [...sortedData].sort((a, b) => {
      const valueA = calculateValues(a)[key];
      const valueB = calculateValues(b)[key];

      if (valueA < valueB) return direction === "asc" ? -1 : 1;
      if (valueA > valueB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortedData(sorted);
    setSortConfig({ key, direction });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-white">
        <thead className="bg-black z-10">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 border border-gray-300 text-left cursor-pointer"
                onClick={() => {
                  if (header !== "Nomor" && header !== "Kata Kunci") {
                    const key = header
                      .toLowerCase()
                      .replace(" ", "")
                      .replace("totalfrekuensi", "totalFrequency")
                      .replace("totalvalue", "totalValue");
                    sortTable(key);
                  }
                }}
              >
                {header}
                {sortConfig.key ===
                  header
                    .toLowerCase()
                    .replace(" ", "")
                    .replace("totalfrekuensi", "totalFrequency")
                    .replace("totalvalue", "totalValue") && (
                  <span> {sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {processedData.map((row, index) => (
            <tr key={index} className="even:bg-neutral-800">
              <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
              <td className="px-4 py-2 border border-gray-300">{row.key}</td>
              <td className="px-4 py-2 border border-gray-300">
                {row.totalFrequency}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {row.kedalaman1}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {row.kedalaman2}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {row.kedalaman3}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {row.kedalaman4}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {row.totalValue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
