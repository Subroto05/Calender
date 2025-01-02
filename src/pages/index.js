import { useState } from 'react'
import AdminModule from '@/components/admin/AdminModule'
import UserModule from '@/components/user/UserModule'
import ReportingModule from '@/components/reporting/ReportingModule'

export default function Home() {
  const [activeModule, setActiveModule] = useState('user')

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Communication Tracker</h1>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveModule('admin')}
                  className={`${
                    activeModule === 'admin'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Admin
                </button>
                <button
                  onClick={() => setActiveModule('user')}
                  className={`${
                    activeModule === 'user'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  User
                </button>
                <button
                  onClick={() => setActiveModule('reporting')}
                  className={`${
                    activeModule === 'reporting'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Reporting
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeModule === 'admin' && <AdminModule />}
        {activeModule === 'user' && <UserModule />}
        {activeModule === 'reporting' && <ReportingModule />}
      </main>
    </div>
  )
}

