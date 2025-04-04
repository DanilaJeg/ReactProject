import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function SingleModule() {
    const { code } = useParams();
    const [module, setModule] = useState(null);
    const [cohorts, setCohorts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchModuleData = async () => {
            try {
                // Fetch module data
                const moduleResponse = await fetch(`http://127.0.0.1:8000/api/module/${code}`);
                if (!moduleResponse.ok) throw new Error("Failed to fetch module");
                const moduleData = await moduleResponse.json();
                setModule(moduleData);
                
                // Fetch cohort data for each delivered_to
                const cohortPromises = moduleData.delivered_to.map(cohortUrl => 
                    fetch(cohortUrl).then(response => response.json())
                );
                
                const cohortData = await Promise.all(cohortPromises);
                setCohorts(cohortData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchModuleData();
    }, [code]);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!module) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                    <p className="text-red-700">Module not found</p>
                </div>
                <Link 
                    to="/module"
                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                >
                    Back to Modules
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">{module.full_name}</h1>
            <p className="text-gray-600 mb-6">Module Code: {module.code}</p>
            
            {/* Module Info Card */}
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                    <h2 className="text-xl font-semibold">Module Information</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Module Code</p>
                            <p className="font-medium">{module.code}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium">{module.full_name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">CA Split</p>
                            <p className="font-medium">{module.ca_split}%</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Exam Split</p>
                            <p className="font-medium">{100 - module.ca_split}%</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Delivered to</p>
                            <p className="font-medium">{cohorts.length} cohorts</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Cohorts Card */}
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                    <h2 className="text-xl font-semibold">Delivered to Cohorts</h2>
                </div>
                <div className="p-6">
                    {cohorts.length === 0 ? (
                        <p className="text-gray-600">This module is not delivered to any cohorts.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cohort ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {cohorts.map((cohort, index) => (
                                        <tr key={cohort.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                                                {cohort.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {cohort.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Year {cohort.year}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link 
                                                    to={`/cohort/${cohort.id}`}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    View Cohort
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
                <Link 
                    to="/module"
                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                >
                    Back to All Modules
                </Link>
                
                <Link 
                    to={`/module/${module.code}/student`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                >
                    View Students
                </Link>
            </div>
        </div>
    );
}

export default SingleModule;