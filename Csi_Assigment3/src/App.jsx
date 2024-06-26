// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Dashboard from './Pages/Dashboard';
import CustomersPage from './Pages/CustomersPage';
import Charts from './Pages/Charts';
import Calendar from './Pages/Calendar';
import Kanban from './Pages/Kanban';
import { ThemeProvider } from './context/ThemeContext';

import './index.css'
import BarChart from './Components/barChart';
import PieChart from './Components/pie_Chart';
import LineGraph from './Components/lineChart';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/charts/bar" element={ <BarChart/> } />
              <Route path="/charts/pie" element={<PieChart/>} />
              <Route path="/charts/liner" element={<LineGraph/>} />


            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;


