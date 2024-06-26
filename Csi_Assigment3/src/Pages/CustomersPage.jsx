// src/CustomersPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const customersPerPage = 10;

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [currentPage]);

  const fetchCustomers = async (page) => {
    try {
      const response = await axios.get(`https://randomuser.me/api/?page=${page}&results=${customersPerPage * 3}`); // Fetch 3 pages of data
      setCustomers(response.data.results.slice((page - 1) * customersPerPage, page * customersPerPage));
      setTotalPages(3); // We know we are fetching 3 pages of data
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSelectCustomer = (index) => {
    setSelectedCustomers((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const handleDeleteSelected = () => {
    const remainingCustomers = customers.filter((_, index) => !selectedCustomers.includes(index));
    setCustomers(remainingCustomers);
    setSelectedCustomers([]);

    if (remainingCustomers.length < customersPerPage && currentPage < totalPages) {
      fetchNextPageCustomers();
    }
  };

  const fetchNextPageCustomers = async () => {
    try {
      const nextPage = currentPage + 1;
      const response = await axios.get(`https://randomuser.me/api/?page=${nextPage}&results=${customersPerPage - customers.length}`);
      setCustomers((prevCustomers) => [...prevCustomers, ...response.data.results]);
    } catch (error) {
      console.error('Error fetching next page customers:', error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">Customers</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
          onClick={handleDeleteSelected}
          disabled={selectedCustomers.length === 0}
        >
          Delete Selected
        </button>
      </header>
      <main>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCustomers(customers.map((_, index) => index));
                      } else {
                        setSelectedCustomers([]);
                      }
                    }}
                    checked={selectedCustomers.length === customers.length}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Photo</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Location</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.includes(index)}
                      onChange={() => handleSelectCustomer(index)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img className="h-10 w-10 rounded-full" src={customer.picture.thumbnail} alt="User Thumbnail" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{`${customer.name.first} ${customer.name.last}`}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{`${customer.location.city}, ${customer.location.country}`}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">Page {currentPage} of {totalPages}</span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomersPage;
