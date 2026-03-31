import React, { useState } from 'react';
import { BarChart, PieChart, Activity, Download, Check, AlertCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';

const Reports = () => {
    const [downloading, setDownloading] = useState(null);
    const [showConfig, setShowConfig] = useState(false);
    const [showData, setShowData] = useState(false);

    const handleDownload = (reportName) => {
        setDownloading(reportName);

        // Simulate a generation delay and then build PDF
        setTimeout(() => {
            const doc = new jsPDF();

            // Add some content to make it look like a real report
            doc.setFontSize(18);
            doc.setTextColor(41, 128, 185);
            doc.text('NeuroTask System Report', 20, 20);

            doc.setFontSize(14);
            doc.setTextColor(44, 62, 80);
            doc.text(`Title: ${reportName}`, 20, 35);

            doc.setFontSize(11);
            doc.setTextColor(127, 140, 141);
            doc.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 20, 45);

            // Draw a generic line separator
            doc.setDrawColor(189, 195, 199);
            doc.setLineWidth(0.5);
            doc.line(20, 50, 190, 50);

            doc.setFontSize(12);
            doc.setTextColor(52, 73, 94);
            const content = `This is an automatically generated system analytics report.\n\nAll metrics, burndown statistics, and team workload evaluations\nare contained internally within the system dashboard.\n\nFor a detailed breakdown, please log in to your NeuroTask Manager Console.\n\nConfidential Data.\nDo not distribute without authorization.`;
            doc.text(content, 20, 65);

            // Trigger the download directly
            doc.save(`${reportName.replace(/\s+/g, '_').toLowerCase()}.pdf`);

            setDownloading(null);
        }, 1500);
    };
    return (
        <div className="flex flex-col h-full bg-gray-50 pb-10">
            <div className="mb-6 flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reports & Analytics</h1>
                    <p className="mt-1 text-sm text-gray-500">Track and export team productivity metrics.</p>
                </div>
                <button
                    onClick={() => handleDownload('Master System Report')}
                    disabled={downloading === 'Master System Report'}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70 transition-all"
                >
                    {downloading === 'Master System Report' ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Generating...
                        </span>
                    ) : (
                        <>
                            <Download className="-ml-1 mr-2 h-5 w-5" />
                            Export Report
                        </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Sprint Burndown chart placeholder */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden transition-all">
                    {showConfig ? (
                        <div className="w-full h-full flex flex-col pt-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <Activity className="h-5 w-5 text-blue-500 mr-2" />
                                Chart Configuration
                            </h3>
                            <div className="space-y-4 flex-1">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
                                    <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                                        <option>Last 7 Days</option>
                                        <option>Last 30 Days</option>
                                        <option>Current Sprint</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Metric</label>
                                    <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                                        <option>Story Points</option>
                                        <option>Task Count</option>
                                        <option>Hours Tracked</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-auto flex justify-end gap-2 pt-4 border-t border-gray-100">
                                <button onClick={() => setShowConfig(false)} className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                                <button onClick={() => setShowConfig(false)} className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded flex items-center">
                                    <Check className="w-4 h-4 mr-1" /> Save
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Activity className="h-16 w-16 text-blue-200 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Sprint Velocity & Burndown</h3>
                            <p className="text-gray-500 text-center text-sm max-w-sm">Detailed charts tracking story points and task completion over time will appear here.</p>
                            <button onClick={() => setShowConfig(true)} className="mt-6 text-sm font-medium text-blue-600 hover:underline">Configure Chart</button>
                        </>
                    )}
                </div>

                {/* Team Distribution placeholder */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center min-h-[300px]">
                    {showData ? (
                        <div className="w-full h-full flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                    <PieChart className="h-5 w-5 text-purple-500 mr-2" />
                                    Team Workload Data
                                </h3>
                                <button onClick={() => setShowData(false)} className="text-sm text-gray-500 hover:text-gray-900">Close</button>
                            </div>
                            <div className="overflow-x-auto flex-1">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tasks</th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr><td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Sarah J.</td><td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">12</td><td className="px-3 py-2"><span className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">Overloaded</span></td></tr>
                                        <tr><td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Mike T.</td><td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">5</td><td className="px-3 py-2"><span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Optimal</span></td></tr>
                                        <tr><td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Alex R.</td><td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">2</td><td className="px-3 py-2"><span className="px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">Light</span></td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <>
                            <PieChart className="h-16 w-16 text-purple-200 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Workload Distribution</h3>
                            <p className="text-gray-500 text-center text-sm max-w-sm">Visual breakdown of task allocation across team members to prevent burnout.</p>
                            <button onClick={() => setShowData(true)} className="mt-6 text-sm font-medium text-purple-600 hover:underline">View Data Table</button>
                        </>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-900">Recent Automated Reports</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {['Weekly Sync Report (March 6)', 'Q1 Preliminary Analytics', 'February End-of-Month Review'].map((report, idx) => (
                        <div key={idx} className="p-6 hover:bg-gray-50 flex items-center justify-between transition-colors">
                            <div className="flex items-center">
                                <BarChart className="h-5 w-5 text-gray-400 mr-4" />
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">{report}</h4>
                                    <p className="text-xs text-gray-500 mt-1">Generated by System</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDownload(report)}
                                disabled={downloading === report}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center disabled:opacity-50 transition-all"
                            >
                                {downloading === report ? (
                                    <>
                                        <svg className="animate-spin mr-1.5 h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Download className="h-4 w-4 mr-1" /> Download
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reports;
