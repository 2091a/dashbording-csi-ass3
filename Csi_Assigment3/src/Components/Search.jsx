// Search.jsx
import React, { useState } from 'react';

const Search = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div className="m-4 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Search</h2>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
          className="border rounded px-2 py-1 flex-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </form>
    </div>
  );
};

export default Search;
