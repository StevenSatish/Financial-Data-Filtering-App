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
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [leftRevenue, setLeftRevenue] = useState('');
  const [rightRevenue, setRightRevenue] = useState('');
  const [leftNet, setLeftNet] = useState('');
  const [rightNet, setRightNet] = useState('');

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
  const makeAPICall = () =>{
    const params = `leftDate=${startYear}&rightDate=${endYear}&leftRevenue=${leftRevenue}&rightRevenue=${rightRevenue}&leftNet=${leftNet}&rightNet=${rightNet}`
    const apiUrl = `http://127.0.0.1:5000/get-filtered-data?${params}`
    fetch(apiUrl, {
      method: "GET", 
      headers: {
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
      })
      .then((data) => {
        setSortedData(data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Handle errors
      });
  }
  const ToggleDateSorting = () =>{
    handleSort('date');
    setDateAscending((prev) => (!prev));
  };

    const [sortedData, setSortedData] = useState(data);

    return (
      <div className="overflow-x-auto tableContainer">
        <div className="buttonContainer flex justify-center">
          <div className="w-1/3 flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700">Select Year Range</label>
            <select 
                id="startYear" 
                name="startYear" 
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                className=""
            >
                <option value=""> </option>
                {[...Array(5)].map((_, index) => (
                    <option key={2020 + index} value={2020 + index}>
                        {2020 + index}
                    </option>
                ))}
            </select>
            to 
            <select 
                id="endYear" 
                name="endYear" 
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                className="mt-2"
            >
                <option value=""> </option>
                {[...Array(5)].map((_, index) => (
                    <option key={2020 + index} value={2020 + index}>
                        {2020 + index}
                    </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700">Input Revenue Range</label>
            <input
              id="leftRevenue"
              type="number"
              value={leftRevenue}
              onChange={(e) => setLeftRevenue(e.target.value)}
              className="w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            to 
            <input
              id="rightRevenue"
              type="number"
              value={rightRevenue}
              onChange={(e) => setRightRevenue(e.target.value)}
              className="w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700">Input Net Income Range</label>
            <input
              id="leftNet"
              type="number"
              value={leftNet}
              onChange={(e) => setLeftNet(e.target.value)}
              className="w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            to 
            <input
              id="rightNet" 
              type="number"
              value={rightNet}
              onChange={(e) => setRightNet(e.target.value)}
              className="w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200"
            onClick={makeAPICall()}>
            Apply Filters
        </button>
        </div>
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