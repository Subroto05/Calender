import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ReportingModule() {
  const { companies, communications, communicationMethods } = useAppContext();
  const [frequencyData, setFrequencyData] = useState({});
  const [effectivenessData, setEffectivenessData] = useState({});
  const [overdueData, setOverdueData] = useState({});

  useEffect(() => {
    // Calculate communication frequency
    const frequency = communicationMethods.reduce((acc, method) => {
      acc[method.name] = communications.filter((comm) => comm.type === method.name).length;
      return acc;
    }, {});
    setFrequencyData(frequency);

    // Calculate engagement effectiveness (simplified version)
    const effectiveness = communicationMethods.reduce((acc, method) => {
      const methodComms = communications.filter((comm) => comm.type === method.name);
      acc[method.name] = (methodComms.length / communications.length) * 100;
      return acc;
    }, {});
    setEffectivenessData(effectiveness);

    // Calculate overdue communications
    const overdue = companies.reduce((acc, company) => {
      const lastComm = communications
        .filter((comm) => comm.companyId === company._id)
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
      
      if (lastComm) {
        const nextDueDate = new Date(lastComm.date);
        nextDueDate.setDate(nextDueDate.getDate() + company.communicationPeriodicity);
        if (nextDueDate < new Date()) {
          acc[company.name] = (new Date() - nextDueDate) / (1000 * 60 * 60 * 24); // days overdue
        }
      }
      return acc;
    }, {});
    setOverdueData(overdue);
  }, [companies, communications, communicationMethods]);

  const frequencyChartData = {
    labels: Object.keys(frequencyData),
    datasets: [
      {
        label: 'Communication Frequency',
        data: Object.values(frequencyData),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const effectivenessChartData = {
    labels: Object.keys(effectivenessData),
    datasets: [
      {
        label: 'Engagement Effectiveness',
        data: Object.values(effectivenessData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  const overdueChartData = {
    labels: Object.keys(overdueData),
    datasets: [
      {
        label: 'Days Overdue',
        data: Object.values(overdueData),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-4">Communication Frequency Report</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <Bar data={frequencyChartData} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Engagement Effectiveness Dashboard</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <Pie data={effectivenessChartData} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Overdue Communication Trends</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <Bar data={overdueChartData} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Real-Time Activity Log</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Communication Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {communications
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 10)
                .map((comm, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(comm.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {companies.find((c) => c._id === comm.companyId)?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {comm.type}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

