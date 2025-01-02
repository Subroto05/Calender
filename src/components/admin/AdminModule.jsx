import React, { useState } from 'react';
import CompanyManagement from './CompanyManagement';
import CommunicationMethodManagement from './CommunicationMethodManagement';

export default function AdminModule() {
  const [activeTab, setActiveTab] = useState('companies');

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-xl">
        <nav className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('companies')}
            className={`${
              activeTab === 'companies'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-indigo-500'
            } flex-1 py-4 px-6 text-center font-semibold transition-colors`}
          >
            Company Management
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`${
              activeTab === 'methods'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-indigo-500'
            } flex-1 py-4 px-6 text-center font-semibold transition-colors`}
          >
            Communication Method Management
          </button>
        </nav>
      </div>

      <div className="bg-white p-6 shadow-md rounded-xl">
        {activeTab === 'companies' && <CompanyManagement />}
        {activeTab === 'methods' && <CommunicationMethodManagement />}
      </div>
    </div>
  );
}
