// src/App.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Ecommerce Dashboard</h1>
      </header>
      <main>
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Total Sales</h2>
              <p className="text-2xl font-bold">5,000</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">New Customers</h2>
              <p className="text-2xl font-bold">250</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Orders</h2>
              <p className="text-2xl font-bold">1,200</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Revenue</h2>
              <p className="text-2xl font-bold">$25,000</p>
            </div>
          </div>
        </section>
        <section>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
            <Line data={data} options={options} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
