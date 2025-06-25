import React from 'react';

const logs = [
  { id: '0022', time: '2025-04-06 14:56:59', action: 'Reset password request', status: 'Success' },
  { id: '0021', time: '2025-04-06 14:55:08', action: 'Failed login attempt', status: 'Failed' },
  // Add others...
];

const SystemLogsTable: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
      <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-600">Recent System Activities</h3>
      
      {/* Mobile view - Cards */}
      <div className="block sm:hidden space-y-3">
        {logs.map(log => (
          <div key={log.id} className="border rounded-lg p-3 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-gray-500">#{log.id}</span>
              <span className={`text-xs px-2 py-1 rounded ${log.status === 'Success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {log.status}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-1">{log.action}</p>
            <p className="text-xs text-gray-400">{log.time}</p>
          </div>
        ))}
      </div>

      {/* Desktop view - Table */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="mx-2 sm:mx-6">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="text-left border-b text-gray-500">
                <th className="pb-2">Log Number</th>
                <th className="pb-2">Timestamp</th>
                <th className="pb-2">Action</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="border-b border-gray-100">
                  <td className="text-gray-400 py-2">{log.id}</td>
                  <td className="text-gray-400 py-2 text-xs sm:text-sm">{log.time}</td>
                  <td className="text-gray-400 py-2">{log.action}</td>
                  <td className={`py-2 ${log.status === 'Success' ? 'text-green-500' : 'text-red-500'}`}>{log.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemLogsTable;
