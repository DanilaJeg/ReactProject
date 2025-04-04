import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';

function CohortModules() {
    const {cohortID} = useParams();
    const [modules, setModules] = useState([]);
    const [cohort, setCohort] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${cohortID}`)
            .then((response) => response.json())
            .then((data) => setModules(data))
            .catch((error) => console.log("Error fetching data:", error))
        
        fetch(`http://127.0.0.1:8000/api/cohort/${cohortID}/`)
            .then((response) => response.json())
            .then((data) => setCohort(data))
            .catch((error) => console.log("Error fetching data:", error))
    }, []);

    if(!cohort) {
        return <p></p>
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">{cohort.name} Modules</h1>
            <p className="text-gray-600 mb-6">Modules delivered to this cohort</p>
            
            {/* Cohort Info Card */}
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                    <h2 className="text-xl font-semibold">Cohort Information</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Cohort ID</p>
                            <p className="font-medium">{cohort.id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium">{cohort.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Year</p>
                            <p className="font-medium">Year {cohort.year}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Modules</p>
                            <p className="font-medium">{modules.length}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Modules Card */}
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Modules</h2>
                        <Link 
                            to="/module/create"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                        >
                            Create New Module
                        </Link>
                    </div>
                </div>
                <div className="p-6">
                    {modules.length === 0 ? (
                        <p className="text-gray-600">No modules delivered to this cohort.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module Code</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CA Split</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {modules.map((module, index) => (
                                        <tr key={module.code} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                                                {module.code}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {module.full_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {module.ca_split}%
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link 
                                                    to={`/module/${module.code}`}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    View Details
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
                    to={`/cohort/${cohort.id}`}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                >
                    Back to Cohort
                </Link>
            </div>
        </div>
    );
};


export default CohortModules;