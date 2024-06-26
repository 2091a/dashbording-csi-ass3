// DataExport.jsx
import React from 'react';

const DataExport = ({ handleExport }) => {
  return (
    <div className="m-4 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Data Export</h2>
      <button onClick={handleExport} className="bg-blue-500 text-white px-4 py-2 rounded">Export Data</button>
    </div>
  );
};

export default DataExport;
