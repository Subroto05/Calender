import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function CalendarView() {
  const { companies, communications } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const data = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dayData = {
        date: new Date(d),
        communications: communications.filter((comm) => {
          const commDate = new Date(comm.date);
          return (
            commDate.getDate() === d.getDate() &&
            commDate.getMonth() === d.getMonth() &&
            commDate.getFullYear() === d.getFullYear()
          );
        }),
      };
      data.push(dayData);
    }
    setCalendarData(data);
  }, [currentDate, companies, communications]);

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Calendar View</h2>
        <div>
          <button onClick={prevMonth} className="mr-2 px-4 py-2 bg-gray-200 rounded-md">
            Previous Month
          </button>
          <button onClick={nextMonth} className="px-4 py-2 bg-gray-200 rounded-md">
            Next Month
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-bold py-2 bg-gray-100">
              {day}
            </div>
          ))}
          {calendarData.map((day, index) => (
            <div
              key={index}
              className={`p-2 min-h-[100px] ${
                day.date.getMonth() === currentDate.getMonth() ? 'bg-white' : 'bg-gray-100'
              }`}
            >
              <div className="font-semibold">{day.date.getDate()}</div>
              {day.communications.map((comm, commIndex) => (
                <div
                  key={commIndex}
                  className="text-xs p-1 mb-1 rounded bg-indigo-100 truncate"
                  title={`${companies.find((c) => c._id === comm.companyId)?.name}: ${comm.type}`}
                >
                  {companies.find((c) => c._id === comm.companyId)?.name}: {comm.type}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

