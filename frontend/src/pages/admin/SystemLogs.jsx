import React from 'react';
import { Terminal, Activity, Server, AlertCircle } from 'lucide-react';

const SystemLogs = () => {
    // Dummy Data
    const logs = [
        { id: 1, type: 'info', message: 'User admin@neurotask.com logged in.', timestamp: '10 mins ago', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 2, type: 'warning', message: 'High CPU usage detected on Node 3.', timestamp: '1 hour ago', icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50' },
        { id: 3, type: 'error', message: 'Failed to connect to AI Inference Service.', timestamp: '2 hours ago', icon: Server, color: 'text-red-500', bg: 'bg-red-50' },
        { id: 4, type: 'info', message: 'Database backup completed successfully.', timestamp: '1 day ago', icon: Terminal, color: 'text-green-500', bg: 'bg-green-50' }
    ];

    return (
        <div className="flex flex-col h-full bg-gray-50 pb-10">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Logs</h1>
                <p className="mt-1 text-sm text-gray-500">Monitor application events and infrastructure health.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flow-root">
                    <ul className="-mb-8">
                        {logs.map((log, logIdx) => {
                            const Icon = log.icon;
                            return (
                                <li key={log.id}>
                                    <div className="relative pb-8">
                                        {logIdx !== logs.length - 1 ? (
                                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                        ) : null}
                                        <div className="relative flex space-x-3">
                                            <div>
                                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${log.bg}`}>
                                                    <Icon className={`h-5 w-5 ${log.color}`} aria-hidden="true" />
                                                </span>
                                            </div>
                                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                <div>
                                                    <p className="text-sm text-gray-800">{log.message}</p>
                                                </div>
                                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                    <time dateTime={log.timestamp}>{log.timestamp}</time>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SystemLogs;
