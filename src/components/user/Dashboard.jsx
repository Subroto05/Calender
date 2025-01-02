import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import CommunicationModal from './CommunicationModal';

export default function Dashboard() {
  const { companies, communications } = useAppContext();
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getLastFiveCommunications = (companyId) => {
    return communications
      .filter((comm) => comm.companyId === companyId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  };

  const getNextScheduledCommunication = (companyId) => {
    const lastCommunication = communications
      .filter((comm) => comm.companyId === companyId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

    if (!lastCommunication) return null;

    const company = companies.find((c) => c._id === companyId);
    const nextDueDate = new Date(lastCommunication.date);
    nextDueDate.setDate(nextDueDate.getDate() + company.communicationPeriodicity);

    return {
      type: lastCommunication.type,
      date: nextDueDate,
    };
  };

  const isOverdue = (company) => {
    const nextScheduled = getNextScheduledCommunication(company._id);
    return nextScheduled && new Date(nextScheduled.date) < new Date();
  };

  const isDueToday = (company) => {
    const nextScheduled = getNextScheduledCommunication(company._id);
    if (!nextScheduled) return false;

    const today = new Date();
    const scheduledDate = new Date(nextScheduled.date);
    return (
      scheduledDate.getDate() === today.getDate() &&
      scheduledDate.getMonth() === today.getMonth() &&
      scheduledDate.getFullYear() === today.getFullYear()
    );
  };

  const handleCompanySelect = (companyId) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleCommunicationPerformed = () => {
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Company Dashboard</h2>
        <button
          onClick={handleCommunicationPerformed}
          disabled={selectedCompanies.length === 0}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
        >
          Communication Performed
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Five Communications
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Scheduled Communication
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => (
              <tr
                key={company._id}
                className={`${
                  isOverdue(company)
                    ? 'bg-red-100'
                    : isDueToday(company)
                    ? 'bg-yellow-100'
                    : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedCompanies.includes(company._id)}
                    onChange={() => handleCompanySelect(company._id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {company.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <ul>
                    {getLastFiveCommunications(company._id).map((comm, index) => (
                      <li key={index} className="group relative">
                        {comm.type} - {new Date(comm.date).toLocaleDateString()}
                        <div className="hidden group-hover:block absolute z-10 p-2 bg-gray-100 rounded shadow-md">
                          {comm.notes}
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getNextScheduledCommunication(company._id) ? (
                    <>
                      {getNextScheduledCommunication(company._id).type} -{' '}
                      {new Date(
                        getNextScheduledCommunication(company._id).date
                      ).toLocaleDateString()}
                    </>
                  ) : (
                    'No communications scheduled'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <CommunicationModal
          companies={selectedCompanies.map((id) => companies.find((c) => c._id === id))}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

