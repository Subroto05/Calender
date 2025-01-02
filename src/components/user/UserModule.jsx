import React, { useState } from 'react';
import Dashboard from './Dashboard';
import CalendarView from './CalendarView';

export default function UserModule() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <nav className="flex">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`${
              activeView === 'dashboard'
                ? 'text-gray-900 border-b-2 border-indigo-500'
                : 'text-gray-500 hover:text-gray-700'
            } flex-1 py-4 px-6 text-center font-medium`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('calendar')}
            className={`${
              activeView === 'calendar'
                ? 'text-gray-900 border-b-2 border-indigo-500'
                : 'text-gray-500 hover:text-gray-700'
            } flex-1 py-4 px-6 text-center font-medium`}
          >
            Calendar View
          </button>
        </nav>
      </div>

      {activeView === 'dashboard' && <Dashboard />}
      {activeView === 'calendar' && <CalendarView />}
    </div>
  );
}

