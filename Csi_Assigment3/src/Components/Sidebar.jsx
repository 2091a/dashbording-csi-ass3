// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4 font-bold">Admin Dashboard</div>
      <nav className="mt-10">
        <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Dashboard
        </Link>
        <Link to="/customers" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Customers
        </Link>
        <div className="px-4 py-2.5 text-gray-400">Charts</div>
        <Link to="/charts/bar" className="block py-2.5 px-8 rounded transition duration-200 hover:bg-gray-700">
          Bar Chart
        </Link>
        <Link to="/charts/pie" className="block py-2.5 px-8 rounded transition duration-200 hover:bg-gray-700">
          Pie Chart
        </Link>
        <Link to="/charts/liner" className="block py-2.5 px-8 rounded transition duration-200 hover:bg-gray-700">
          Liner
        </Link>
        <Link to="/calendar" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Calendar
        </Link>
        <Link to="/kanban" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Kanban
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
