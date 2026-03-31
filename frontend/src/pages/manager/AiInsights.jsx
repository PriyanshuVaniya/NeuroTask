import React, { useState } from 'react';
import { BrainCircuit, TrendingUp, AlertTriangle, CheckSquare, Clock, X, CheckCircle } from 'lucide-react';

const AiInsights = () => {
    const [dismissedInsights, setDismissedInsights] = useState([]);
    const [appliedFixes, setAppliedFixes] = useState([]);
    const [showRiskModal, setShowRiskModal] = useState(false);

    const handleDismiss = (id) => setDismissedInsights(prev => [...prev, id]);

    const handleApplyFix = (id) => {
        setAppliedFixes(prev => [...prev, id]);
        setTimeout(() => handleDismiss(id), 2000); // Auto dismiss after 2s showing success
    };

    const isDismissed = (id) => dismissedInsights.includes(id);
    const isApplied = (id) => appliedFixes.includes(id);
    return (
        <div className="flex flex-col h-full bg-gray-50 pb-10">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">AI Insights</h1>
                    <p className="mt-1 text-sm text-gray-500">Intelligent analysis and actionable recommendations for your team.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <BrainCircuit className="h-6 w-6 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                            System Active
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Overall Health</h3>
                    <p className="text-sm text-gray-500 mb-4">Your team's workload is balanced and sprint goals are on track.</p>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Velocity Increase</h3>
                    <p className="text-sm text-gray-500 mb-4">Task completion rate has increased by 14% this week.</p>
                    <div className="text-green-600 font-bold text-2xl">+14%</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-red-50 rounded-lg">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Risk Factors</h3>
                    <p className="text-sm text-gray-500 mb-4">2 High priority tasks might miss their deadline based on current progress.</p>
                    <button
                        onClick={() => setShowRiskModal(true)}
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                        Review Risks &rarr;
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <BrainCircuit className="h-5 w-5 mr-2 text-purple-500" />
                        Recommended Actions
                    </h3>
                </div>
                <div className="divide-y divide-gray-100">
                    <div className="divide-y divide-gray-100">

                        {!isDismissed('insight-1') && (
                            <div className={`p-6 hover:bg-gray-50 transition-colors flex gap-4 ${isApplied('insight-1') ? 'bg-green-50/50' : ''}`}>
                                <div className="mt-1 flex-shrink-0">
                                    {isApplied('insight-1') ? (
                                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                        </div>
                                    ) : (
                                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                                            <Clock className="h-4 w-4 text-amber-600" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">Reassign "Setup Global Context"</h4>
                                    <p className="text-sm text-gray-500 mt-1">Employee One is currently overloaded. Consider shifting this to Employee Two to ensure the deadline is met.</p>
                                    <div className="mt-3 flex gap-3">
                                        {isApplied('insight-1') ? (
                                            <span className="text-xs font-medium text-green-700 flex items-center">
                                                <CheckCircle className="h-3 w-3 mr-1" /> Fix Applied Systematically
                                            </span>
                                        ) : (
                                            <>
                                                <button onClick={() => handleApplyFix('insight-1')} className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1.5 rounded hover:bg-blue-100 transition-colors">Apply Fix</button>
                                                <button onClick={() => handleDismiss('insight-1')} className="text-xs font-medium text-gray-500 hover:text-gray-700">Dismiss</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {!isDismissed('insight-2') && (
                            <div className={`p-6 hover:bg-gray-50 transition-colors flex gap-4 ${isApplied('insight-2') ? 'bg-green-50/50' : ''}`}>
                                <div className="mt-1 flex-shrink-0">
                                    {isApplied('insight-2') ? (
                                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                        </div>
                                    ) : (
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <CheckSquare className="h-4 w-4 text-blue-600" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">Break down "Admin Features" task</h4>
                                    <p className="text-sm text-gray-500 mt-1">This task is estimated to take longer than typical items in your sprint. Consider breaking it down into smaller subtasks.</p>
                                    <div className="mt-3 flex gap-3">
                                        {isApplied('insight-2') ? (
                                            <span className="text-xs font-medium text-green-700 flex items-center">
                                                <CheckCircle className="h-3 w-3 mr-1" /> Subtasks generated by AI
                                            </span>
                                        ) : (
                                            <>
                                                <button onClick={() => handleApplyFix('insight-2')} className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1.5 rounded hover:bg-blue-100 transition-colors">Generate Subtasks</button>
                                                <button onClick={() => handleDismiss('insight-2')} className="text-xs font-medium text-gray-500 hover:text-gray-700">Dismiss</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {(isDismissed('insight-1') && isDismissed('insight-2')) && (
                            <div className="p-10 text-center flex flex-col items-center justify-center">
                                <CheckCircle className="h-10 w-10 text-green-400 mb-3" />
                                <h4 className="text-base font-medium text-gray-900">All caught up!</h4>
                                <p className="text-sm text-gray-500 mt-1">No pending AI insights to review.</p>
                            </div>
                        )}

                    </div>
                </div>

                {/* Simulated Risk Modal */}
                {showRiskModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                            <div className="flex justify-between items-center p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold flex items-center text-gray-900">
                                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                                    Risk Analysis Report
                                </h2>
                                <button onClick={() => setShowRiskModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-600 mb-4">
                                    NeuroTask AI has identified the following tasks as having a high probability (&gt;80%) of missing their intended deadlines based on historical velocity constraints.
                                </p>
                                <div className="space-y-3 mb-6">
                                    <div className="p-3 border border-red-100 bg-red-50 rounded-lg flex justify-between items-center">
                                        <div>
                                            <h4 className="font-medium text-gray-900 text-sm">Implement OAuth Login</h4>
                                            <p className="text-xs text-gray-500">Assigned to: Alex R.</p>
                                        </div>
                                        <span className="text-xs font-bold text-red-600 uppercase">92% Risk</span>
                                    </div>
                                    <div className="p-3 border border-amber-100 bg-amber-50 rounded-lg flex justify-between items-center">
                                        <div>
                                            <h4 className="font-medium text-gray-900 text-sm">Database Schema Migration</h4>
                                            <p className="text-xs text-gray-500">Assigned to: Sarah J.</p>
                                        </div>
                                        <span className="text-xs font-bold text-amber-600 uppercase">84% Risk</span>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button onClick={() => setShowRiskModal(false)} className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        Ignore for now
                                    </button>
                                    <button onClick={() => setShowRiskModal(false)} className="px-4 py-2 bg-blue-600 rounded text-sm font-medium text-white hover:bg-blue-700">
                                        Re-allocate Resources
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AiInsights;
