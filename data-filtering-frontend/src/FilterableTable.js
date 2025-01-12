import './FilterableTable.css';
import React, { useEffect, useState } from 'react';
import SortableHeader from './SortableHeader';

function FilterableTable() {

  useEffect(() => {
    makeAPICall();  // Call your function
  }, []);

  const [dateAscending, setDateAscending] = useState(false);
  const [revenueAscending, setRevenueAscending] = useState(false);
  const [netAscending, setNetAscending] = useState(false);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [leftRevenue, setLeftRevenue] = useState('');
  const [rightRevenue, setRightRevenue] = useState('');
  const [leftNet, setLeftNet] = useState('');
  const [rightNet, setRightNet] = useState('');

  const handleSort = (key) => {
    const sorted = [...sortedData].sort((a, b) => {
        if (key == 'date'){
          return dateAscending 
            ? new Date(b['date']) - new Date(a['date'])
            : new Date(a['date']) - new Date(b['date']);
        }
        else if (key == 'revenue'){
          return revenueAscending
          ? b['revenue'] - a['revenue']
          : a['revenue'] - b['revenue'];
        }
        else{
          return netAscending
          ? b['netIncome'] - a['netIncome']
          : a['netIncome'] - b['netIncome'];
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
        for (let i = 0; i < data.length; i++) {
            data[i].transactionID = i;
            data[i].grossProfit = Number(data[i].grossProfit).toLocaleString();
            data[i].netIncome = Number(data[i].netIncome).toLocaleString();
            data[i].operatingIncome = Number(data[i].operatingIncome).toLocaleString();
            data[i].revenue = Number(data[i].revenue).toLocaleString();
        }
        setSortedData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Handle errors
      });
  }
  const ToggleDateSorting = () =>{
    handleSort('date');
    setDateAscending((prev) => (!prev));
  };
  const ToggleRevenueSorting = () =>{
    handleSort('revenue');
    setRevenueAscending((prev) => (!prev));
  };
  const ToggleNetSorting = () =>{
    handleSort('netIncome');
    setNetAscending((prev) => (!prev));
  };

    const [sortedData, setSortedData] = useState([]);

    return (
        <div>
          <div className="buttonContainer bg-gray-700 mt-3 mb-3 bg-opacity-20 flex flex-col md:flex-row justify-center items-center mx-auto max-w-7xl space-y-4 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/3 flex flex-col items-center">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Year</label>
                  <div className="flex flex-row items-center space-x-2">
                      <select 
                          id="startYear" 
                          name="startYear" 
                          value={startYear}
                          onChange={(e) => setStartYear(e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                      >
                          <option value=""> </option>
                          {[...Array(5)].map((_, index) => (
                              <option key={2020 + index} value={2020 + index}>
                                  {2020 + index}
                              </option>
                          ))}
                      </select>
                      <span>to</span>
                      <select 
                          id="endYear" 
                          name="endYear" 
                          value={endYear}
                          onChange={(e) => setEndYear(e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                      >
                          <option value=""> </option>
                          {[...Array(5)].map((_, index) => (
                              <option key={2020 + index} value={2020 + index}>
                                  {2020 + index}
                              </option>
                          ))}
                      </select>
                  </div>
              </div>

              <div className="w-full md:w-1/3 flex flex-col items-center">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Revenue</label>
                  <div className="flex flex-row items-center space-x-2">
                      <input
                          id="leftRevenue"
                          type="number"
                          value={leftRevenue}
                          onChange={(e) => setLeftRevenue(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span>to</span>
                      <input
                          id="rightRevenue"
                          type="number"
                          value={rightRevenue}
                          onChange={(e) => setRightRevenue(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                  </div>
              </div>

              <div className="w-full md:w-1/3 flex flex-col items-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Net Income</label>
                <div className="flex flex-row items-center space-x-2">
                  <input
                    id="leftNet"
                    type="number"
                    value={leftNet}
                    onChange={(e) => setLeftNet(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span>to</span>
                  <input
                      id="rightNet"
                      type="number"
                      value={rightNet}
                      onChange={(e) => setRightNet(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                  className="w-full md:w-auto mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200"
                  onClick={() => makeAPICall()}>
                  Apply Filters
              </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm md:text-base">
              <thead>
                  <tr className="bg-gray-200 border-b-2 border-black">
                    <SortableHeader
                      onClick={ToggleDateSorting}
                      isAscending={dateAscending}
                      label="Date"
                    />
                    <SortableHeader
                      onClick={ToggleRevenueSorting}
                      isAscending={revenueAscending}
                      label="Revenue"
                    />
                    <SortableHeader
                      onClick={ToggleNetSorting}
                      isAscending={netAscending}
                      label="Net Income"
                    />
                    <th className="whitespace-nowrap w-auto px-3 md:px-6 py-2 md:py-3 border-r border-black text-center font-bold">Gross Profit</th>
                    <th className="whitespace-nowrap w-auto px-3 md:px-6 py-2 md:py-3 border-r border-black text-center font-bold">EPS</th>
                    <th className="whitespace-nowrap w-auto px-3 md:px-6 py-2 md:py-3 text-center font-bold">Operating Income</th>
                  </tr>
              </thead>
              <tbody>
                {sortedData.map((row) => (
                    <tr key={row.transactionID} className="odd:bg-white even:bg-gray-50 border-b border-black">
                      <td className="whitespace-nowrap w-auto px-3 md:px-6 py-2 md:py-3 border-r border-black text-center">{row.date}</td>
                      <td className="whitespace-nowrap w-auto px-3 md:px-6 py-2 md:py-3 border-r border-black text-center">{row.revenue}</td>
                      <td className="whitespace-nowrap w-auto px-3 md:px-6 py-2 md:py-3 border-r border-black text-center">{row.netIncome}</td>
                      <td className="whitespace-nowrap w-auto px-3 md:px-6 py-2 md:py-3 border-r border-black text-center">{row.grossProfit}</td>
                      <td className="whitespace-nowrap w-auto px-3 md:px-6 py-2 md:py-3 border-r border-black text-center">{row.eps}</td>
                      <td className="whitespace-nowrap w-auto px-3 md:px-6 py-2 md:py-3 text-center">{row.operatingIncome}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    );
}
  
export default FilterableTable;