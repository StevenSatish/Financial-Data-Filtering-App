import React from "react";

const SortableHeader = ({ onClick, isAscending, label }) => {
  return (
    <th className="whitespace-nowrap w-auto px-3 md:px-6 py-2 md:py-3 border-r border-black text-center font-bold">
      <button onClick={onClick} className="w-full flex items-center justify-center">
        {label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 transform transition-transform ${
            isAscending ? "" : "rotate-180"
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
  );
};

export default SortableHeader;
