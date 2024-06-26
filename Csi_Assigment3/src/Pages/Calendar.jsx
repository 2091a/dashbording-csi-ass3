// src/Pages/Calendar.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const events = [
    {
      id: 1,
      title: 'Board Meeting',
      start: new Date(2023, 5, 15, 10, 0),
      end: new Date(2023, 5, 15, 12, 0),
    },
    {
      id: 2,
      title: 'Training Session',
      start: new Date(2023, 5, 17, 14, 0),
      end: new Date(2023, 5, 17, 16, 0),
    },
  ];

  return (
    <div className="m-4 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Event Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 650 }}
      />
    </div>
  );
};

export default CalendarComponent;
