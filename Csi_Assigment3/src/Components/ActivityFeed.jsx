// ActivityFeed.jsx
import React from 'react';

const ActivityFeed = () => {
  // Dummy activity data for demonstration
  const activities = [
    { id: 1, text: 'Updated project status to "In Progress"', timestamp: '1 hour ago' },
    { id: 2, text: 'Added new task: "Implement search functionality"', timestamp: '2 hours ago' },
    { id: 3, text: 'Completed training session', timestamp: '3 hours ago' },
  ];

  return (
    <div className="m-4 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Activity Feed</h2>
      <ul className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <li key={activity.id} className="py-2">
            <p className="text-lg">{activity.text}</p>
            <p className="text-sm text-gray-500">{activity.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
