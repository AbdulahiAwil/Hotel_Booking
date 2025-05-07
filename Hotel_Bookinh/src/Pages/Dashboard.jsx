import React from 'react';
import { Users, Gauge, Plug, PlugZap } from 'lucide-react';

const stats = [
  {
    title: 'Total Customers',
    value: '16,652',
    icon: <Users className="w-6 h-6 text-green-500" />,
    borderColor: 'border-green-500'
  },
  {
    title: 'Total Meters',
    value: '16,653',
    icon: <Gauge className="w-6 h-6 text-yellow-500" />,
    borderColor: 'border-yellow-500'
  },
  {
    title: 'Connected Meters',
    value: '15,369',
    icon: <Plug className="w-6 h-6 text-blue-500" />,
    borderColor: 'border-blue-500'
  },
  {
    title: 'Disconnected Meters',
    value: '1,284',
    icon: <PlugZap className="w-6 h-6 text-red-500" />,
    borderColor: 'border-red-500'
  }
];

export default function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome to Smartmeter</h1>
        <div className="text-sm text-blue-600 flex items-center gap-1">
          <span className="text-gray-600">🏠</span> Dashboard
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${item.borderColor}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
