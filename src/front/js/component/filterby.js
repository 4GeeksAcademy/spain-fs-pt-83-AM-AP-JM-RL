// import React, { useEffect, useState } from "react";

// export const FilterBy = ({ onFilterChange }) => {
//   const [priceRange, setPriceRange] = useState({ min: "", max: "" });
//   const [timeRange, setTimeRange] = useState({ start: "", end: "" });
//   const [dateRange, setDateRange] = useState({ start: "", end: "" });

//   useEffect(() => {
//     console.log("FilterBy mounted");

//     return () => {
//       console.log("FilterBy unmounted");
//     };
//   }, []);

//   useEffect(() => {
//     const applyFilters = () => {
//       onFilterChange({ priceRange, timeRange, dateRange });
//     };

//     applyFilters();
//   }, [priceRange, timeRange, dateRange, onFilterChange]);

//   return (
//     <div className="filter-by">
//       <h4>Filter By</h4>

//       {/* Price Filter */}
//       <div className="filter-group">
//         <label>Price Range</label>
//         <input
//           type="number"
//           placeholder="Min"
//           value={priceRange.min}
//           onChange={(e) =>
//             setPriceRange((prev) => ({ ...prev, min: e.target.value }))
//           }
//         />
//         <input
//           type="number"
//           placeholder="Max"
//           value={priceRange.max}
//           onChange={(e) =>
//             setPriceRange((prev) => ({ ...prev, max: e.target.value }))
//           }
//         />
//       </div>

//       {/* Time Filter */}
//       <div className="filter-group">
//         <label>Time Range</label>
//         <input
//           type="time"
//           value={timeRange.start}
//           onChange={(e) =>
//             setTimeRange((prev) => ({ ...prev, start: e.target.value }))
//           }
//         />
//         <input
//           type="time"
//           value={timeRange.end}
//           onChange={(e) =>
//             setTimeRange((prev) => ({ ...prev, end: e.target.value }))
//           }
//         />
//       </div>

//       {/* Date Filter */}
//       <div className="filter-group">
//         <label>Date Range</label>
//         <input
//           type="date"
//           value={dateRange.start}
//           onChange={(e) =>
//             setDateRange((prev) => ({ ...prev, start: e.target.value }))
//           }
//         />
//         <input
//           type="date"
//           value={dateRange.end}
//           onChange={(e) =>
//             setDateRange((prev) => ({ ...prev, end: e.target.value }))
//           }
//         />
//       </div>
//     </div>
//   );
// };
