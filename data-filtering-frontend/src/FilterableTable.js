import './FilterableTable.css';
import React, { useState } from 'react';

function FilterableTable() {
  const data = [
    { id: 1, date: "08-10-2004", revenue: 23443, netIncome: 12343,
        grossProfit: 438712, eps: 12312, operatingIncome: 12312 },
    { id: 2, date: "04-16-2004", revenue: 23443, netIncome: 12343,
        grossProfit: 438712, eps: 12312, operatingIncome: 12312 },
    { id: 3, date: "09-12-2004", revenue: 23443, netIncome: 12343,
        grossProfit: 438712, eps: 12312, operatingIncome: 12312 },
    { id: 4, date: "10-12-2008", revenue: 23443, netIncome: 12343,
        grossProfit: 438712, eps: 12312, operatingIncome: 12312 },
    { id: 5, date: "02-12-2004", revenue: 23443, netIncome: 12343,
        grossProfit: 438712, eps: 12312, operatingIncome: 12312 },
  ];
  const [dateAscending, setDateAscending] = useState(true);

  const handleSort = (key) => {
    const sorted = [...data].sort((a, b) => {
        if (key === 'date') {
            return dateAscending 
                ? new Date(b[key]) - new Date(a[key])
                : new Date(a[key]) - new Date(b[key]);
        }
    });
    setSortedData(sorted);
  }
  const ToggleDateSorting = () =>{
    handleSort('date');
    setDateAscending((prev) => (!prev));
  };
    // Sample data
    const [sortedData, setSortedData] = useState(data);
  
    return (
      <div className="overflow-x-auto tableContainer">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 border-b-2 border-black">
              <th className="w-16 px-6 py-3 border-r border-black text-center font-bold">
                <button onClick={ToggleDateSorting} className="w-full flex items-center">
                  Date
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 ml-2 transform transition-transform ${
                    dateAscending ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                </button>
              </th>
              <th className="w-16 px-6 py-3 border-r border-black text-center font-bold">Revenue</th>
              <th className="w-16 px-6 py-3 border-r border-black text-center font-bold">Net Income</th>
              <th className="w-16 px-6 py-3 border-r border-black text-center font-bold">Gross Profit</th>
              <th className="w-16 px-6 py-3 border-r border-black text-center font-bold">EPS</th>
              <th className="w-16 px-6 py-3 text-center font-bold">Operating Income</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr key={row.id} className="odd:bg-white even:bg-gray-50 border-b border-black">
                <td className="w-16 px-6 py-3 border-r border-black text-center">{row.date}</td>
                <td className="w-16 px-6 py-3 border-r border-black text-center">{row.revenue}</td>
                <td className="w-16 px-6 py-3 border-r border-black text-center">{row.netIncome}</td>
                <td className="w-16 px-6 py-3 border-r border-black text-center">{row.grossProfit}</td>
                <td className="w-16 px-6 py-3 border-r border-black text-center">{row.eps}</td>
                <td className="w-16 px-6 py-3 text-center">{row.operatingIncome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default FilterableTable;