import React from 'react';
import { Bot, Zap, Clock, ShieldCheck } from 'lucide-react';

const AgentActivity = () => {
    // Dummy Data
    const agents = [
        { id: 'ag1', name: 'Workload Planner Agent', status: 'Online', events: 142, uptime: '99.9%', icon: Bot, color: 'text-purple-600', bg: 'bg-purple-100' },
        { id: 'ag2', name: 'Code Review Agent', status: 'Busy', events: 89, uptime: '98.5%', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-100' },
        { id: 'ag3', name: 'Scheduling Agent', status: 'Online', events: 34, uptime: '100%', icon: Clock, color: 'text-green-600', bg: 'bg-green-100' }
    ];

    return (
        <div className="flex flex-col h-full bg-gray-50 pb-10">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Agent Activity</h1>
                    <p className="mt-1 text-sm text-gray-500">Monitor AI agents and their performance metrics.</p>
                </div>
                <div className="flex items-center text-sm font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200 shadow-sm">
                    <span className="relative flex h-2.5 w-2.5 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    System Online
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {agents.map(agent => {
                    const Icon = agent.icon;
                    return (
                        <div key={agent.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${agent.bg}`}>
                                    <Icon className={`h-6 w-6 ${agent.color}`} />
                                </div>
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${agent.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                                    }`}>
                                    {agent.status}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <p className="text-xs text-gray-500 mb-1 flex items-center"><Zap className="h-3 w-3 mr-1" /> Events 24h</p>
                                        <p className="text-lg font-bold text-gray-900">{agent.events}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <p className="text-xs text-gray-500 mb-1">Uptime</p>
                                        <p className="text-lg font-bold text-gray-900">{agent.uptime}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AgentActivity;
