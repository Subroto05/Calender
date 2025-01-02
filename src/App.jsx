import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import AdminModule from './components/admin/AdminModule';
import UserModule from './components/user/UserModule';
import ReportingModule from './components/reporting/ReportingModule';
import Notifications from './components/common/Notifications';

function App() {
  const [activeModule, setActiveModule] = useState('user');

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-xl font-bold text-gray-800">Communication Tracker</h1>
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      to="/admin"
                      onClick={() => setActiveModule('admin')}
                      className={`${
                        activeModule === 'admin'
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      Admin
                    </Link>
                    <Link
                      to="/user"
                      onClick={() => setActiveModule('user')}
                      className={`${
                        activeModule === 'user'
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      User
                    </Link>
                    <Link
                      to="/reporting"
                      onClick={() => setActiveModule('reporting')}
                      className={`${
                        activeModule === 'reporting'
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      Reporting
                    </Link>
                  </div>
                </div>
                <Notifications />
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/admin" element={<AdminModule />} />
              <Route path="/user" element={<UserModule />} />
              <Route path="/reporting" element={<ReportingModule />} />
              <Route path="/" element={<UserModule />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

